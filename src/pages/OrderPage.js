import React, { useState, useEffect } from 'react';

function OrderPage() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    address: '',
    phone: '',
  });

  useEffect(() => {
    // Načtení košíku z localStorage
    const loadedCart = localStorage.getItem('cart');
    if (loadedCart) {
      const items = JSON.parse(loadedCart);
      setCart(items);
      calculateTotal(items);
    }
  }, []);

  const calculateTotal = (items) => {
    const total = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
    setTotal(total);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Odeslat objednávku - tady byste mohli integrovat API pro odeslání dat
    console.log('Order submitted:', orderDetails, cart);
    alert('Thank you for your order!');
    // Resetovat košík a přesměrovat na úvodní stránku nebo stránku potvrzení
    localStorage.removeItem('cart');
    setCart([]);
    window.location.href = '/';
  };

  return (
    <div>
      <h1>Order Summary</h1>
      <ul>
        {cart.map(item => (
          <li key={item.id}>
            {item.name} - {item.quantity} x {item.price} CZK = {item.quantity * item.price} CZK
          </li>
        ))}
      </ul>
      <h3>Total: {total} CZK</h3>
      <h2>Enter your details</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={orderDetails.name} onChange={handleInputChange} placeholder="Your Name" required />
        <input type="text" name="address" value={orderDetails.address} onChange={handleInputChange} placeholder="Your Address" required />
        <input type="text" name="phone" value={orderDetails.phone} onChange={handleInputChange} placeholder="Your Phone Number" required />
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}

export default OrderPage;
