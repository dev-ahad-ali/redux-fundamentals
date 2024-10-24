import { createSelector, createSlice } from '@reduxjs/toolkit';

const findItemIndex = (state, action) =>
  state.findIndex((cartItem) => cartItem.productId === action.payload.productId);

const slice = createSlice({
  name: 'cart',
  initialState: {
    loading: false,
    list: [],
    error: '',
  },
  reducers: {
    fetchCartItemsError(state, action) {
      state.loading = false;
      state.error = action.payload || 'Something went wrong!';
    },
    fetchCartItems(state) {
      state.loading = true;
    },
    loadAllCartItems(state, action) {
      state.error = '';
      state.loading = false;
      state.list = action.payload.products;
    },
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
});

const getCartItems = ({ products, cartItems }) => {
  return cartItems.list
    .map(({ productId, quantity }) => {
      const cartProducts = products.list.find(({ id }) => id === productId);
      return { ...cartProducts, quantity };
    })
    .filter(({ title }) => title);
};
export const getAllCartItems = createSelector(getCartItems, (state) => {
  return [...state];
});

export const getCartLoading = (state) => state.cartItems.loading;
export const getCartError = (state) => state.cartItems.error;

export const {
  fetchCartItemsError,
  loadAllCartItems,
  addCartItem,
  removeCartItem,
  cartItemIncreaseQuantity,
  cartItemDecreaseQuantity,
  fetchCartItems,
} = slice.actions;

export default slice.reducer;
