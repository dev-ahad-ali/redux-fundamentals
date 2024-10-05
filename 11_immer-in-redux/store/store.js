import { legacy_createStore as createStore, combineReducers } from 'redux';
import productReducer from './slices/productSlice.js';
import cartReducer from './slices/cartSlice.js';
import wishlistReducer from './slices/wishlistSlice.js';

const reducer = combineReducers({
  products: productReducer,
  cartItems: cartReducer,
  wishlist: wishlistReducer,
});

export const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__?.());

// Testing immer js ------

/* const users = [
  {
    name: 'john',
    age: 22,
  },
  {
    name: 'mac',
    age: 25,
  },
  {
    name: 'ghost',
    age: 26,
  },
]; */

// users[1].age = 30;

/* const newUsers = users.map((user, idx) => {
  if (idx === 1) {
    return { ...user, age: 30 };
  }
  return user;
}); */

/* const newUsers = produce(users, (usersCopy) => {
  usersCopy[1].age = 30;
}); */

// console.log(users);
// console.log(newUsers);
