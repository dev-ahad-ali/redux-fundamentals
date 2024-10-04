import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CartIcon from '../assets/cart-icon.svg';
import { useSelector } from 'react-redux';

export default function Header() {
  const cartItems = useSelector((state) => state.cartItems);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const count = cartItems?.reduce(
      (accumulator, currentItem) => accumulator + currentItem.quantity,
      0
    );
    setItemCount(count);
  }, [cartItems]);

  return (
    <header>
      <div className='header-contents'>
        <h1>
          <Link to='/'>Shopee</Link>
        </h1>
        <Link className='cart-icon' to='/cart'>
          <img src={CartIcon} alt='cart-icon' />
          <div className='cart-items-count'>{itemCount}</div>
        </Link>
      </div>
    </header>
  );
}
