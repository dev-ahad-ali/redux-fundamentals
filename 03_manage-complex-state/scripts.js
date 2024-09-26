import { legacy_createStore as createStore } from 'redux';
import { productsList } from './products.js';

const initialState = {
  products: productsList,
  cartItems: [],
  wishlist: [],
};

const CART_ADD_ITEM = 'cart/addItem';
const CART_REMOVE_ITEM = 'cart/removeItem';
const CART_ITEM_INCREASE_QUANTITY = 'cart/increaseQuantity';
const CART_ITEM_DECREASE_QUANTITY = 'cart/decreaseQuantity';
const WISHLIST_ADD_ITEM = 'wishlist/addItem';
const WISHLIST_REMOVE_ITEM = 'wishlist/removeItem';

function reducer(state = initialState, action) {
  switch (action.type) {
    case CART_ADD_ITEM:
      return { ...state, cartItems: [...state.cartItems, action.payload] };
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems?.filter(
          (cartItem) => cartItem.productId !== action.payload.productId
        ),
      };
    case CART_ITEM_INCREASE_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems?.map((cartItem) => {
          if (cartItem.productId === action.payload.productId) {
            return { ...cartItem, quantity: cartItem.quantity + 1 };
          } else {
            return cartItem;
          }
        }),
      };
    case CART_ITEM_DECREASE_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems
          ?.map((cartItem) => {
            if (cartItem.productId === action.payload.productId) {
              return { ...cartItem, quantity: cartItem.quantity - 1 };
            } else {
              return cartItem;
            }
          })
          .filter((cartItem) => cartItem.quantity > 0),
      };
    case WISHLIST_ADD_ITEM:
      return { ...state, wishlist: [...state.wishlist, action.payload] };
    case WISHLIST_REMOVE_ITEM:
      return {
        ...state,
        wishlist: state.wishlist?.filter(
          (wishlistItem) => wishlistItem.productId !== action.payload.productId
        ),
      };

    default:
      return state;
  }
}

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__?.());
console.log(store);

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
