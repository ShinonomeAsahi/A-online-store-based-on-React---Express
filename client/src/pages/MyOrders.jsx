import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      {orders.map((order) => (
        <div key={order.id} className="bg-white shadow-md rounded-lg p-6 mb-4">
          <h2 className="text-xl font-semibold mb-2">Order #{order.id}</h2>
          <p className="mb-2">Date: {new Date(order.order_date).toLocaleDateString()}</p>
          <p className="mb-2">Total: ${order.total_amount}</p>
          <Link to={`/my-orders/${order.id}`} className="text-blue-600 hover:underline">
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
}