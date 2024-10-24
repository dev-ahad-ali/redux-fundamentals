import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CartIcon from '../assets/cart-icon.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts,
  fetchProductsError,
  updateAllProducts,
} from '../store/slices/productSlice.js';
import {
  fetchCartItems,
  fetchCartItemsError,
  loadAllCartItems,
} from '../store/slices/cartSlice.js';

export default function Header() {
  const cartItems = useSelector((state) => state.cartItems.list);
  const [itemCount, setItemCount] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        dispatch(updateAllProducts(data));
      })
      .catch(() => dispatch(fetchProductsError()));

    dispatch(fetchCartItems());
    fetch('https://fakestoreapi.com/carts/5')
      .then((res) => res.json())
      .then((data) => {
        dispatch(loadAllCartItems(data));
      })
      .catch(() => dispatch(fetchCartItemsError()));
  }, []);

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
