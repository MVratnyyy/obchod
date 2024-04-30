import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';

function Home() {
  return (
    <div>
      <h1>Welcome to Our Shop</h1>
      <ProductList />
    </div>
  );
}

export default Home;
