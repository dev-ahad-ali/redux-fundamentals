import { legacy_createStore as createStore } from 'redux';
import productReducer from './productReducer.js';
import cartReducer from './cartReducer.js';
import wishlistReducer from './wishlistReducer.js';

export const CART_ADD_ITEM = 'cart/addItem';
export const CART_REMOVE_ITEM = 'cart/removeItem';
export const CART_ITEM_INCREASE_QUANTITY = 'cart/increaseQuantity';
export const CART_ITEM_DECREASE_QUANTITY = 'cart/decreaseQuantity';
export const WISHLIST_ADD_ITEM = 'wishlist/addItem';
export const WISHLIST_REMOVE_ITEM = 'wishlist/removeItem';

// Own Reducer...

function combineReducers(reducers) {
  const reducersKeys = Object.keys(reducers);

  return function (state = {}, action) {
    const nextState = {};
    for (let i = 0; i < reducers.length; i++) {
      const key = reducersKeys[i];
      const reducer = reducers[key];
      const previousStateForKey = state[key];
      const nextStateForKey = reducer(previousStateForKey, action);
      nextState[key] = nextStateForKey;
    }
    return nextState;
  };
}

const reducer = combineReducers({
  products: productReducer,
  cartItems: cartReducer,
  wishlist: wishlistReducer,
});

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__?.());
console.log(store.getState());

store.dispatch({ type: CART_ADD_ITEM, payload: { productId: 1, quantity: 1 } });
store.dispatch({ type: CART_ADD_ITEM, payload: { productId: 11, quantity: 1 } });
store.dispatch({ type: CART_ADD_ITEM, payload: { productId: 4, quantity: 1 } });
store.dispatch({ type: CART_ADD_ITEM, payload: { productId: 8, quantity: 1 } });
store.dispatch({ type: CART_REMOVE_ITEM, payload: { productId: 4 } });
store.dispatch({ type: CART_ITEM_INCREASE_QUANTITY, payload: { productId: 1 } });
store.dispatch({ type: CART_ITEM_INCREASE_QUANTITY, payload: { productId: 11 } });
store.dispatch({ type: CART_ITEM_INCREASE_QUANTITY, payload: { productId: 1 } });
store.dispatch({ type: CART_ITEM_DECREASE_QUANTITY, payload: { productId: 1 } });
store.dispatch({ type: CART_ITEM_DECREASE_QUANTITY, payload: { productId: 1 } });
store.dispatch({ type: CART_ITEM_DECREASE_QUANTITY, payload: { productId: 1 } });
store.dispatch({ type: WISHLIST_ADD_ITEM, payload: { productId: 9 } });
store.dispatch({ type: WISHLIST_ADD_ITEM, payload: { productId: 19 } });
store.dispatch({ type: WISHLIST_REMOVE_ITEM, payload: { productId: 9 } });
