import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../provider/AuthProvider';

export default function OrderDetails() {
  const [orderDetails, setOrderDetails] = useState(null);
  const [orderInfo, setOrderInfo] = useState(null);
  const { orderId } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  // 使用正则匹配图片URL
  const urlPattern = /(https?:\/\/[^\s]+)/g;

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.post(`http://localhost:3001/api/orders/getOrderDetailsByOrderId`, { order_id: orderId }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setOrderDetails(response.data);
      } catch (error) {
        console.error('Failed to fetch order details:', error);
      }
    };
    fetchOrderDetails();
  }, [orderId]);

  useEffect(() => {
    const fetchOrderInfo = async () => {
      try {
        const response = await axios.post(`http://localhost:3001/api/orders/getOrderInfo`, { order_id: orderId }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrderInfo(response.data[0]);
      } catch (error) {
        console.error('Failed to fetch order details:', error);
      }
    };
    fetchOrderInfo();
  }, [orderId]);

  if (!orderDetails) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8 pt-24 flex justify-center">
      <button
        onClick={() => navigate('/shop')}
        className=" flex border-b-2 border-black text-black hover:text-gray-700 text-sm fixed left-10 top-24"
      >
        ↼ Back to Shop
      </button>

      <div className="bg-white shadow-md rounded-lg p-6 mt-8 w-1/2">
        <p className="mb-2">Order Date: {new Date(orderInfo.created_at).toLocaleDateString()}</p>
        <p className="mb-2">Order Total: ${orderInfo.order_total_amount}</p>
        <h2 className="text-xl font-semibold mt-4 mb-2">Items:</h2>
        <ul role="list" className="divide-y divide-gray-200">
          {orderDetails.map((item) => (
            <li key={item.product_id.product_name} className="flex py-6 bg-gray-100 rounded-lg px-4 mb-2">
              <img
                src={item.product_id.product_img_url.match(urlPattern)[0]}
                alt={item.product_id.product_name}
                className="h-24 w-24 flex-shrink-0 rounded-md object-cover object-center"
              />
              <div className="ml-4 flex flex-1 flex-col px-4">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>{item.product_id.product_name}</h3>
                    <p className="ml-4">${item.product_order_price}</p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {item.product_id.product_color}
                  </p>
                </div>
                <div className="flex items-end justify-between text-sm">
                  <p className="text-gray-500">Quantity {item.order_quantity}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}