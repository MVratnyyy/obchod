import React, { useState, useEffect } from 'react';

function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Načítání historie objednávek z localStorage
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  if (orders.length === 0) {
    return <div>No previous orders found.</div>;
  }

  return (
    <div>
      <h1>Order History</h1>
      <ul>
        {orders.map((order, index) => (
          <li key={index}>
            <h2>Order {index + 1}</h2>
            <p>Date: {order.date}</p>
            <p>Total: {order.total} CZK</p>
            <div>
              <h3>Items:</h3>
              <ul>
                {order.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    {item.name} - {item.quantity} x {item.price} CZK
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderHistory;
