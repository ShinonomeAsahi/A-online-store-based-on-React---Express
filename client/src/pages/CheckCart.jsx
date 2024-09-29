import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { CreditCardIcon } from "@heroicons/react/24/outline";
// 导入支付图标
import visaIcon from "../assets/paymentIcons/visa.svg";
import mastercardIcon from "../assets/paymentIcons/mastercard.svg";
import jcbIcon from "../assets/paymentIcons/jcb.svg";
import unionpayIcon from "../assets/paymentIcons/unionpay.svg";
import { useAuth } from "../provider/AuthProvider";
import PaymentProcess from "../components/PaymentProcess";

export default function CheckCart() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = location.state || { cart: [] };
  const { token, user_id } = useAuth();
  const [showPaymentProcess, setShowPaymentProcess] = useState(false);
  const [orderId, setOrderId] = useState(null);

  // Calculate total price
  const totalPrice = cart
    .reduce((total, item) => {
      const price = parseFloat(item.product_id.product_price);
      const quantity = parseInt(item.user_cart_quantity, 10);
      if (!isNaN(price) && !isNaN(quantity)) {
        return total + price * quantity;
      }
      return total;
    }, 0)
    .toFixed(2);

  // 使用正则匹配图片URL
  const urlPattern = /(https?:\/\/[^\s]+)/g;

  const shippingFee = 5.0;

  // 计算增值税
  function calculateTax(totalPrice, taxRate) {
    return (totalPrice * taxRate).toFixed(2);
  }

  const [paymentStatus, setPaymentStatus] = useState("");

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      // 创建订单
      const orderResponse = await axios.post("http://localhost:3001/api/orders/createOrder", {
        user_id: user_id,
        order_total_amount: parseFloat(totalPrice) + shippingFee,
        order_status: "pending",
        order_items: cart.map(item => ({
          product_id: item.product_id._id,
          quantity: item.user_cart_quantity,
          price: item.product_id.product_price,
          discount: 0
        }))
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setOrderId(orderResponse.data._id);
      setShowPaymentProcess(true);
    } catch (error) {
      console.error("Order creation failed:", error);
      setPaymentStatus("Order creation failed. Please try again.", error);
    }
  };

  const handlePaymentComplete = async () => {
    try {
      // 支付成功后更新订单状态
      await axios.post("http://localhost:3001/api/orders/paymentSuccess", {
        order_id: orderId,
        user_id: user_id
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPaymentStatus("Payment successful!");
      navigate(`/my-orders/${orderId}`);
    } catch (error) {
      console.error("Payment status update failed:", error);
      setPaymentStatus("Payment failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row pt-20">
      {/* Order Summary Section */}
      <section
        aria-labelledby="summary-heading"
        className="bg-gray-100 lg:w-1/2 p-8 overflow-y-auto h-screen scrollbar-thin scrollbar-thumb-gray-400"
      >
        <div style={{ paddingLeft: "40%" }}>
          <h2
            id="summary-heading"
            className="text-2xl font-semibold text-gray-900 mb-6"
          >
            Order summary
          </h2>
          <ul role="list" className="divide-y divide-gray-200">
            {cart.map((product, index) => (
              <li key={index} className="flex py-6">
                <img
                  src={product.product_id.product_img_url.match(urlPattern)[0]}
                  alt={product.product_id.product_name}
                  className="h-24 w-24 flex-shrink-0 rounded-md object-cover object-center"
                />
                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>{product.product_id.product_name}</h3>
                      <p className="ml-4">
                        ${parseFloat(product.product_id.product_price).toFixed(2)}
                      </p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.product_id.product_color}
                    </p>
                  </div>
                  <div className="flex items-end justify-between text-sm">
                    <p className="text-gray-500">Quantity {product.user_cart_quantity}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <dl className="mt-6 space-y-4 border-t border-gray-200 pt-6 text-sm font-medium">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd>${totalPrice}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Tax excl.</dt>
              <dd>${totalPrice - calculateTax(totalPrice, 0.13)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Taxes</dt>
              {/* 按照13%税率计算增值税 */}
              <dd>${calculateTax(totalPrice, 0.13)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Shipping</dt>
              <dd>$5.00</dd>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-4 text-base font-bold">
              <dt>Total</dt>
              <dd>${(parseFloat(totalPrice) + shippingFee).toFixed(2)}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Payment and Shipping Section */}
      <section
        aria-labelledby="payment-and-shipping-heading"
        className="lg:w-1/2 p-8 overflow-y-auto h-screen"
      >
        <form onSubmit={handlePayment} className="w-3/5">
          {/* Payment Details */}
          <div className="mb-6">
            <div className="flex items-center pb-4">
              <CreditCardIcon className="w-10 h-10 mr-2" />
              <h3 className="text-lg font-medium text-gray-900">
                Pay with credit card
              </h3>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-4">
                <label
                  htmlFor="card-number"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Card number
                </label>
                <div className="flex justify-between items-center border rounded-md border-gray-300 rounded-md shadow-md focus:ring-indigo-500 focus:border-indigo-500">
                  <input
                    type="text"
                    id="card-number"
                    name="card-number"
                    autoComplete="cc-number"
                    placeholder="1234 5678 9101 1234"
                    className="w-2/3 px-3 py-2 border border-transparent"
                  />
                  <div className="w-1/3 flex items-end justify-end pr-2">
                    <img
                      src={visaIcon}
                      alt="Visa"
                      className="h-6 w-auto pr-2"
                    />
                    <img
                      src={mastercardIcon}
                      alt="Mastercard"
                      className="h-6 w-auto pr-2"
                    />
                    <img
                      src={jcbIcon}
                      alt="American Express"
                      className="h-6 w-auto pr-2"
                    />
                    <img
                      src={unionpayIcon}
                      alt="Discover"
                      className="h-6 w-auto"
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="expiration-date"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Expiration date (MM/YY)
                </label>
                <input
                  type="text"
                  id="expiration-date"
                  name="expiration-date"
                  autoComplete="cc-exp"
                  placeholder="12/25"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="cvc"
                  className="block text-sm font-medium text-gray-700 mb-2"
                  placeholder="123"
                >
                  CVC
                </label>
                <input
                  type="text"
                  id="cvc"
                  name="cvc"
                  autoComplete="csc"
                  placeholder="123"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Shipping address
            </h3>
            <div className="grid grid-cols-6 gap-4">
              <div className="col-span-6">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  autoComplete="street-address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="col-span-3">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  autoComplete="address-level2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="col-span-3">
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  State / Province
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  autoComplete="address-level1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="col-span-3">
                <label
                  htmlFor="postal-code"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Postal code
                </label>
                <input
                  type="text"
                  id="postal-code"
                  name="postal-code"
                  autoComplete="postal-code"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              onClick={handlePayment}
            >
              Pay now
            </button>
          </div>
        </form>
        {paymentStatus && (
          <div className="mt-4 text-center text-lg">{paymentStatus}</div>
        )}
      </section>
      {showPaymentProcess && (
        <PaymentProcess onComplete={handlePaymentComplete} />
      )}
    </div>
  );
}
