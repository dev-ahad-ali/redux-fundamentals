import productReducer from './slices/productSlice.js';
import cartReducer from './slices/cartSlice.js';
import wishlistReducer from './slices/wishlistSlice.js';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    products: productReducer,
    cartItems: cartReducer,
    wishlist: wishlistReducer,
  },
});
