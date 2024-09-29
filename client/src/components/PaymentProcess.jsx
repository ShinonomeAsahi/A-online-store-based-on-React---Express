import React, { useState, useEffect } from 'react';

const PaymentProcess = ({ onComplete }) => {
  const [status, setStatus] = useState('Fetching payment information...');

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus('Payment successful!');
      setTimeout(onComplete, 1000);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-4">Processing Payment</h2>
        <p className="text-lg">{status}</p>
      </div>
    </div>
  );
};

export default PaymentProcess;