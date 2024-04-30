import React from 'react';

function ProductDetail({ product }) {
  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(p => p.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1; // Pokud již produkt existuje, zvyšte množství
    } else {
      cart.push({...product, quantity: 1}); // Jinak přidejte nový produkt s množstvím 1
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Price: {product.price} CZK</p>
      <p>Description: {product.description}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}

export default ProductDetail;
