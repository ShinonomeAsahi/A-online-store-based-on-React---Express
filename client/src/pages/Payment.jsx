import React, { useState } from 'react';
import axios from 'axios';

const Payment = () => {
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    amount: ''
  });

  const handleChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/payments/process', paymentData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect width="100%" height="100%" strokeWidth={0} fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />
        </svg>
      </div>
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
          <h2 className="text-2xl mb-4">Payment</h2>
          <div className="mb-4">
            <label className="block mb-1">Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={paymentData.cardNumber}
              onChange={handleChange}
              className="w-full border-2 rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Expiry Date</label>
            <input
              type="text"
              name="expiryDate"
              value={paymentData.expiryDate}
              onChange={handleChange}
              className="w-full border-2 rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">CVV</label>
            <input
              type="text"
              name="cvv"
              value={paymentData.cvv}
              onChange={handleChange}
              className="w-full border-2 rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Amount</label>
            <input
              type="text"
              name="amount"
              value={paymentData.amount}
              onChange={handleChange}
              className="w-full border-2 rounded px-3 py-2"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Pay Now</button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
