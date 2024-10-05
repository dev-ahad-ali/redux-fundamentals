import { useDispatch } from 'react-redux';
import {
  cartItemDecreaseQuantity,
  cartItemIncreaseQuantity,
  removeCartItem,
} from '../store/slices/cartSlice.js';

export default function CartItem({ productId, title, rating, price, imageUrl, quantity }) {
  const dispatch = useDispatch();
  return (
    <div className='cart-item-container'>
      <div className='cart-item'>
        <img src={imageUrl} alt={title} />
        <div>
          <h3>{title}</h3>
          <p>{rating} ★ ★ ★ ★</p>
        </div>
      </div>
      <div className='item-price'>${price}</div>
      <div className='item-quantity'>
        <button onClick={() => dispatch(cartItemDecreaseQuantity(productId))}>-</button>
        <span>{quantity}</span>
        <button onClick={() => dispatch(cartItemIncreaseQuantity(productId))}>+</button>
        <button onClick={() => dispatch(removeCartItem(productId))}>Remove</button>
      </div>
      <div className='item-total'>${quantity * price}</div>
    </div>
  );
}