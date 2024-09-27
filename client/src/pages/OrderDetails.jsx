import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function OrderDetails() {
  const [order, setOrder] = useState(null);
  const { orderId } = useParams();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`/api/orders/${orderId}`);
        setOrder(response.data);
      } catch (error) {
        console.error('Failed to fetch order details:', error);
      }
    };
    fetchOrderDetails();
  }, [orderId]);

  if (!order) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Order #{order.id} Details</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="mb-2">Date: {new Date(order.order_date).toLocaleDateString()}</p>
        <p className="mb-2">Total: ${order.total_amount}</p>
        <h2 className="text-xl font-semibold mt-4 mb-2">Items:</h2>
        <ul>
          {order.items.map((item) => (
            <li key={item.id} className="mb-2">
              {item.product_name} - Quantity: {item.quantity} - Price: ${item.price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}