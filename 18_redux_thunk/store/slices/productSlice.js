import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'products',
  initialState: {
    loading: false,
    list: [],
    error: '',
  },
  reducers: {
    fetchProducts: (state) => {
      state.loading = true;
    },
    fetchProductsError: (state, action) => {
      state.loading = false;
      state.error = action.payload || 'something went wrong';
    },
    updateAllProducts: (state, action) => {
      state.list = action.payload;
      state.loading = false;
      state.error = '';
    },
  },
});

export const selectAllProducts = (state) => state.products.list;
export const selectProductsLoading = (state) => state.products.loading;
export const selectProductsError = (state) => state.products.error;

const { updateAllProducts, fetchProducts, fetchProductsError } = slice.actions;

// Thunk action creators....
export const fetchProductsData = () => (dispatch) => {
  dispatch(fetchProducts());
  fetch('https://fakestoreapi.com/products')
    .then((res) => res.json())
    .then((data) => {
      dispatch(updateAllProducts(data));
    })
    .catch(() => {
      dispatch(fetchProductsError());
    });
};

export default slice.reducer;
