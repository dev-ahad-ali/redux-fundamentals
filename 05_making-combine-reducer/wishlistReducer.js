import { WISHLIST_ADD_ITEM, WISHLIST_REMOVE_ITEM } from './scripts.js';

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
