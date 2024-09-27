import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const EventList = () => {
  const [EventList, setEventList] = useState([]);

  useEffect(() => {
    const fetchEventList = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/events/getEventList');
        setEventList(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEventList();
  }, []);

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
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">Events</h1>
        <ul className="space-y-8">
          {EventList.map(event => (
            <li key={event.event_id} className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{event.event_title}</h2>
              <p className="text-gray-600 mb-4">{new Date(event.created_at).toLocaleDateString()}</p>
              <Link to={`/event/${event.event_id}`} className="text-indigo-600 hover:underline">Read more</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EventList;
