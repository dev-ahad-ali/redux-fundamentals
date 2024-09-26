// Ducks Pattern ---------------------->

// action types
const WISHLIST_ADD_ITEM = 'wishlist/addItem';
const WISHLIST_REMOVE_ITEM = 'wishlist/removeItem';

// action creators
export function addWishListItem(productId) {
  return { type: WISHLIST_ADD_ITEM, payload: { productId } };
}

export function removeWishListItem(productId) {
  return { type: WISHLIST_REMOVE_ITEM, payload: { productId } };
}

// reducer
export default function wishlistReducer(state = [], action) {
  switch (action.type) {
    case WISHLIST_ADD_ITEM:
      return [...state, action.payload];
    case WISHLIST_REMOVE_ITEM:
      return state?.filter((wishlistItem) => wishlistItem.productId !== action.payload.productId);
    default:
      return state;
  }
}
