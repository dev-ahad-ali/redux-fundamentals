import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';

const findItemIndex = (state, action) =>
  state.findIndex((cartItem) => cartItem.productId === action.payload.productId);

export const fetchCartData = createAsyncThunk('cart/fetchCartItems', async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/carts/5');
    return response.json();
  } catch (err) {
    throw err;
  }
});

const slice = createSlice({
  name: 'cart',
  initialState: {
    loading: false,
    list: [],
    error: '',
  },
  reducers: {
    addCartItem(state, action) {
      const existingItemIndex = findItemIndex(state.list, action);
      if (existingItemIndex !== -1) {
        state.list[existingItemIndex].quantity += 1;
      } else {
        state.list.push({ ...action.payload, quantity: 1 });
      }
    },
    removeCartItem(state, action) {
      const existingItemIndex = findItemIndex(state.list, action);
      state.list.splice(existingItemIndex, 1);
    },
    cartItemIncreaseQuantity(state, action) {
      const existingItemIndex = findItemIndex(state.list, action);
      state.list[existingItemIndex].quantity += 1;
    },
    cartItemDecreaseQuantity(state, action) {
      const existingItemIndex = findItemIndex(state.list, action);
      state.list[existingItemIndex].quantity -= 1;
      if (state.list[existingItemIndex].quantity === 0) {
        state.list.splice(existingItemIndex, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartData.fulfilled, (state, action) => {
        state.error = '';
        state.loading = false;
        state.list = action.payload.products;
      })
      .addCase(fetchCartData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong!';
      });
  },
});

const getProduct = (state) => state.products;
const getCart = (state) => state.cartItems;

const getCartItems = (products, cartItems) => {
  return cartItems.list
    .map(({ productId, quantity }) => {
      const cartProducts = products.list.find(({ id }) => id === productId);
      return { ...cartProducts, quantity };
    })
    .filter(({ title }) => title);
};

export const getAllCartItems = createSelector([getProduct, getCart], (products, cartItems) => {
  return getCartItems(products, cartItems);
});
export const getCartLoading = (state) => state.cartItems.loading;
export const getCartError = (state) => state.cartItems.error;

export const { addCartItem, removeCartItem, cartItemIncreaseQuantity, cartItemDecreaseQuantity } =
  slice.actions;

export default slice.reducer;
