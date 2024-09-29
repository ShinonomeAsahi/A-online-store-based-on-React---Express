// Tabs.jsx
import React, { useState, useEffect } from 'react';
import CateView from './CateView'; // 假设我们有一个新的统一视图组件
import axios from 'axios';
import { useAuth } from '../../../provider/AuthProvider';

const Tabs = () => {
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState(null);
  const [categories, setCategories] = useState([]);
  const [newDiscussions, setNewDiscussions] = useState([]);
  const [newUsers, setNewUsers] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/discussions/getDiscussionCategory", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCategories(res.data);
        localStorage.setItem("categories", JSON.stringify(res.data));
        if (res.data.length > 0) {
          setActiveTab(res.data[0]._id);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, [token]);

  useEffect(() => {
    const fetchNewDiscussion = async () => {
      const res = await axios.get("http://localhost:3001/api/discussions/getNewDiscussion",{
        params: {
          number: 3
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setNewDiscussions(res.data)
    }
    fetchNewDiscussion()
  }, [token])

  useEffect(() => {
    const fetchNewUser = async () => {
      const res = await axios.get("http://localhost:3001/api/users/getNewUser",{
        params: {
          number: 3
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setNewUsers(res.data)
    }
    fetchNewUser()
  }, [token])

  return (
    <div className="mx-auto pb-10">
      <div className="flex justify-between items-center border-b border-gray-300 mb-4">
        <div className="flex space-x-4">
          {categories.map(category => (
            <button
              key={category._id}
              className={`py-2 px-4 text-sm font-medium focus:outline-none rounded-lg transition ${
                activeTab === category._id
                  ? 'bg-gray-600 text-white'
                  : 'text-gray-900 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab(category._id)}
            >
              {category.category_name}
            </button>
          ))}
        </div>
      </div>
      <div className="p-6 bg-white shadow-md rounded-lg mt-4">
        {activeTab && (
          <CateView 
            category={categories.find(cat => cat._id === activeTab)} 
            newDiscussions={newDiscussions}
            newUsers={newUsers}
          />
        )}
      </div>
    </div>
  );
};

export default Tabs;
