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

export const { updateAllProducts, fetchProducts, fetchProductsError } = slice.actions;

export default slice.reducer;
