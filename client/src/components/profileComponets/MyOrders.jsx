import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');
  const user_id = localStorage.getItem('user_id');
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.post('http://localhost:3001/api/orders/getOrdersByUser', {
          user_id: user_id
        },{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
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
          <p className="mb-2">Date: {new Date(order.created_at).toLocaleDateString()}</p>
          <p className="mb-2">Total: ${order.order_total_amount}</p>
          <Link to={`/my-orders/${order._id}`} className="text-gray-500 underline hover:text-gray-900">
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
}