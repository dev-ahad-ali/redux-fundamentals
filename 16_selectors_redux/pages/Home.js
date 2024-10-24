import React from 'react';
import { useSelector } from 'react-redux';
import Product from '../components/Product';
import {
  selectAllProducts,
  selectProductsError,
  selectProductsLoading,
} from '../store/slices/productSlice.js';

export default function Home() {
  const productsList = useSelector(selectAllProducts);
  const isLoading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  // useSelector(console.log);
  return isLoading ? (
    <h1 style={{ textAlign: 'center' }}>Loading....</h1>
  ) : error ? (
    <h1 style={{ textAlign: 'center' }}>{error}</h1>
  ) : (
    <div className='products-container'>
      {productsList?.map(({ id, title, rating, price, image }) => (
        <Product
          key={id}
          productId={id}
          title={title}
          rating={rating.rate}
          price={price}
          imageUrl={image}
        />
      ))}
    </div>
  );
}
