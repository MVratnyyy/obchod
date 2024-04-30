import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import products from '../data/products.json';  // Ujistěte se, že tato cesta k souboru je správná

function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let loadedCart = localStorage.getItem('cart');
    if (loadedCart) {
      setCart(JSON.parse(loadedCart));
    } else {
      // Přidání produktu 1 do košíku, pokud je košík prázdný
      const product1 = products.find(p => p.id === 1);
      if (product1) {
        loadedCart = [{ ...product1, quantity: 1 }];
        localStorage.setItem('cart', JSON.stringify(loadedCart));
        setCart(loadedCart);
      }
    }
  }, []);

  const updateQuantity = (productId, quantity) => {
    const updatedCart = cart.map(item => {
      if (item.id === productId) {
        return { ...item, quantity: quantity };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  if (cart.length === 0) {
    return <div>Your cart is empty.</div>;
  }

  return (
    <div>
      <h1>Your Cart</h1>
      <ul>
        {cart.map(item => (
          <li key={item.id}>
            <h2>{item.name} - {item.price} CZK each</h2>
            <p>Quantity: 
              <input 
                type="number" 
                value={item.quantity} 
                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                min="1"
              />
            </p>
            <button onClick={() => removeItem(item.id)}>Remove from Cart</button>
          </li>
        ))}
      </ul>
      <div>Total: {cart.reduce((acc, item) => acc + item.price * item.quantity, 0)} CZK</div>
      <Link to="/order">Proceed to Checkout</Link>  {/* Zajistěte, že tato cesta odpovídá vašemu router setupu */}
    </div>
  );
}

export default CartPage;
