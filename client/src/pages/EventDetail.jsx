import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const baseURL = 'http://localhost:3001/api/events';

const EventDetail = () => {
  const { event_id } = useParams();
  const [event, setEvent] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${baseURL}/getEventById`, {
          params: { event_id: event_id }
        });
        setEvent(response.data);
      } catch (error) {
        console.error('Error fetching event', error);
      }
    };
    fetchEvent();
  }, [event_id]);

  const handlePurchase = async () => {
    try {
      const response = await axios.post(`${baseURL}/checkoutEvent`, {
        event_id: event_id,
        quantity: quantity
      }, {
        withCredentials: true
      });
      if (response.status === 200) {
        setOrderPlaced(true);
      }
    } catch (error) {
      setErrorMessage('Error placing order: ' + error.response);
    }
  };

  if (!event) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  if (orderPlaced) {
    return <div className="text-center mt-20">Checking your order...</div>;
  }

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
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">{event.event_title}</h1>
        <p className="text-gray-600 mb-4">{new Date(event.created_at).toLocaleDateString()}</p>
        <div className="prose mb-8">{event.event_description}</div>
        <div className="mb-4">
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="mt-1 block w-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <button
          onClick={handlePurchase}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Purchase Ticket
        </button>
        {errorMessage && <p className="mt-2 text-sm text-red-600">{errorMessage}</p>}
        <div className="mt-8">
          <Link to="/event" className="text-indigo-600 hover:underline">Back to event lists</Link>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
