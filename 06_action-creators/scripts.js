import { legacy_createStore as createStore, combineReducers } from 'redux';
import productReducer from './productReducer.js';
import cartReducer, {
  addCartItem,
  cartItemDecreaseQuantity,
  cartItemIncreaseQuantity,
  removeCartItem,
} from './cartReducer.js';
import wishlistReducer, { addWishListItem, removeWishListItem } from './wishlistReducer.js';

const reducer = combineReducers({
  products: productReducer,
  cartItems: cartReducer,
  wishlist: wishlistReducer,
});

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__?.());
console.log(store.getState());

store.dispatch(addCartItem(1));
store.dispatch(addCartItem(11));
store.dispatch(addCartItem(4));
store.dispatch(addCartItem(8));

store.dispatch(removeCartItem(4));

store.dispatch(cartItemIncreaseQuantity(1));
store.dispatch(cartItemIncreaseQuantity(11));
store.dispatch(cartItemIncreaseQuantity(1));

store.dispatch(cartItemDecreaseQuantity(1));
store.dispatch(cartItemDecreaseQuantity(1));
store.dispatch(cartItemDecreaseQuantity(1));

store.dispatch(addWishListItem(9));
store.dispatch(addWishListItem(19));
store.dispatch(removeWishListItem(9));
