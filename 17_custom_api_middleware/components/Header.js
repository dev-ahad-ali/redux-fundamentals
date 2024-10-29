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
import { fetchData } from '../store/middleware/api.js';

export default function Header() {
  const cartItems = useSelector((state) => state.cartItems.list);
  const [itemCount, setItemCount] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchData({
        url: 'products',
        onStart: fetchProducts.type,
        onSuccess: updateAllProducts.type,
        onFailure: fetchProductsError.type,
      })
    );

    dispatch(
      fetchData({
        url: 'carts/5',
        onStart: fetchCartItems.type,
        onSuccess: loadAllCartItems.type,
        onFailure: fetchCartItemsError.type,
      })
    );
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
