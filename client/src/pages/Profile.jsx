import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../provider/AuthProvider';
import UserInfo from '../components/UserInfo';
import UserPosts from '../components/UserPosts';
import EditProfileForm from '../components/EditProfileForm';

export default function Profile() {
  const [userDetail, setUserDetail] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');
  const { token, user_id, user_name } = useAuth();

  useEffect(() => {
    fetchUserDetail();
  }, [user_id]);

  const fetchUserDetail = async () => {
    try {
      const headers = {
        'Authorization': `Bearer ${token}`
      };
      const response = await axios.get(`http://localhost:3001/api/users/getUserInfo?user_id=${user_id}`, { headers });
      setUserDetail(response.data.userDetail);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);

  const handleSubmit = async (editedUser) => {
    try {
      await axios.put('http://localhost:3001/api/users/updateUserInfo', editedUser, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setUserDetail(editedUser);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update user data:', error);
    }
  };

  if (!userDetail) return <div>Loading...</div>;

  return (
    <div className='pt-20'>
      {/* User banner */}
      <div className="flex justify-start alien-center w-full h-40 bg-gray-100 border-b-2 border-gray-200" style={{paddingLeft: "20%"}}>
        {/* User avatar */}
        <div className="flex items-center justify-center h-full">
          <img src={require("../assets/images/zuo2.jpg")} alt="User Avatar" className="w-20 h-20 rounded-full" />
        </div>
        {/* User BasicInfo */}
        <div className="flex items-center justify-center pl-10 h-full">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">{user_name}</h1>
          {userDetail.user_gender === 'male' ? <h1 className="text-2xl font-semibold text-gray-900 mb-6">Male</h1> : <h1 className="text-2xl font-semibold text-gray-900 mb-6">Female</h1>}
          <span>Registered at {userDetail.user_created_at}</span>
        </div>
      </div>

      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* User Info Section */}
        <section
          aria-labelledby="summary-heading"
          className="bg-gray-100 lg:w-1/2 p-8 overflow-y-auto h-screen scrollbar-thin scrollbar-thumb-gray-400"
        >
          <div style={{ paddingLeft: "40%" }}>
            <ul role="list" className="divide-y divide-gray-200">
              <li>
                <h2
                  id="summary-heading"
                  className="text-2xl font-semibold text-gray-900 mb-6"
                >
                  Orders
                </h2>
              </li>
              <li>
                <h2
                  id="summary-heading"
                  className="text-2xl font-semibold text-gray-900 mb-6"
                >
                  Comments
                </h2>
              </li>
              <li>
                <h2
                  id="summary-heading"
                  className="text-2xl font-semibold text-gray-900 mb-6"
                >
                  Discussion
                </h2>
              </li>
              <li>
                <h2
                  id="summary-heading"
                  className="text-2xl font-semibold text-gray-900 mb-6"
                >
                  KUDOS
                </h2>
              </li>
              <li>
                <h2
                  id="summary-heading"
                  className="text-2xl font-semibold text-gray-900 mb-6"
                >
                  Followed users
                </h2>
              </li>
              <li>
                <h2
                  id="summary-heading"
                  className="text-2xl font-semibold text-gray-900 mb-6"
                >
                  Followers
                </h2>
              </li>
            </ul>
          </div>
        </section>

        {/* function rendering section */}
        <section
          aria-labelledby="payment-and-shipping-heading"
          className="lg:w-1/2 p-8 overflow-y-auto h-screen"
        >
          <form className="w-3/5">
            <div className="mb-6 border-b-2 border-gray-200"> 
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Test</h2>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
