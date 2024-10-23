import React, { useEffect, useState } from 'react';
import CartItem from '../components/CartItem.js';
import { useSelector } from 'react-redux';

export default function Cart() {
  const cartItems = useSelector(({ products, cartItems }) => {
    return cartItems.list
      .map(({ productId, quantity }) => {
        const cartProducts = products.list.find(({ id }) => id === productId);
        return { ...cartProducts, quantity };
      })
      .filter(({ title }) => title);
  });
  const isLoading = useSelector((state) => state.cartItems.loading);
  const isError = useSelector((state) => state.cartItems.error);
  const [totalPrice, setTotalPrice] = useState(0);
  // console.log(cartItems);

  useEffect(() => {
    const total = cartItems
      ?.reduce(
        (accumulator, currentItem) => accumulator + currentItem.price * currentItem.quantity,
        0
      )
      .toFixed(2);
    setTotalPrice(parseFloat(total));
  }, [cartItems.length]);

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
        {isLoading ? (
          <h1 style={{ textAlign: 'center' }}>Loading....</h1>
        ) : isError ? (
          <h1 style={{ textAlign: 'center' }}>{isError}</h1>
        ) : (
          cartItems.map(({ id, title, rating, price, image, quantity }) => (
            <CartItem
              key={id}
              title={title}
              productId={id}
              price={price}
              quantity={quantity}
              imageUrl={image}
              rating={rating.rate}
            />
          ))
        )}
        <div className='cart-header cart-item-container'>
          <div></div>
          <div></div>
          <div></div>
          {!(isLoading || isError) && <div className='total'>${totalPrice}</div>}
        </div>
      </div>
    </div>
  );
}
