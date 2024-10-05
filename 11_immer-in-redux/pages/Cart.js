import React, { useEffect, useState } from 'react';
import CartItem from '../components/CartItem.js';
import { useSelector } from 'react-redux';

export default function Cart() {
  const cartItems = useSelector((state) => state.cartItems);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const total = cartItems
      ?.reduce(
        (accumulator, currentItem) => accumulator + currentItem.price * currentItem.quantity,
        0
      )
      .toFixed(2);
    setTotalPrice(parseFloat(total));
  }, [cartItems]);

  return (
    <div className='cart-container'>
      <h2>Items in Your Cart</h2>
      <div className='cart-items-container'>
        <div className='cart-header cart-item-container'>
          <div className='cart-item'>Item</div>
          <div className='item-price'>Price</div>
          <div className='quantity'>Quantity</div>
          <div className='total'>Total</div>
        </div>
        {cartItems.map(({ productId, title, rating, price, imageUrl, quantity }) => (
          <CartItem
            key={productId}
            title={title}
            productId={productId}
            price={price}
            quantity={quantity}
            imageUrl={imageUrl}
            rating={rating}
          />
        ))}
        <div className='cart-header cart-item-container'>
          <div></div>
          <div></div>
          <div></div>
          <div className='total'>${totalPrice}</div>
        </div>
      </div>
    </div>
  );
}
