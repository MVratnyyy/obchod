import React, { useState, useEffect } from 'react';
import products from '../data/products.json';

function ProductList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(products);  // Načtení produktů z JSON souboru
  }, []);

  return (
    <div>
      {items.map(item => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>{item.price}</p>
          <p>{item.category}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
