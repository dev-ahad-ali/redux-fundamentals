import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchProductsData = createAsyncThunk('products/fetchProducts', async () => {
  try {
    const res = await fetch('https://fakestoreapi.com/products');
    return res.json();
  } catch (err) {
    throw err;
  }
});

const slice = createSlice({
  name: 'products',
  initialState: {
    loading: false,
    list: [],
    error: '',
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsData.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
        state.error = '';
      })
      .addCase(fetchProductsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'something went wrong';
      });
  },
});

export const selectAllProducts = (state) => state.products.list;
export const selectProductsLoading = (state) => state.products.loading;
export const selectProductsError = (state) => state.products.error;

export default slice.reducer;
