import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../provider/AuthProvider';
import EditProfileForm from '../components/EditProfileForm';
import MyOrders from '../components/profileComponets/MyOrders';
import UserInfo from '../components/profileComponets/UserInfo';
import UserComments from '../components/profileComponets/UserComment';
import UserPosts from '../components/profileComponets/UserPosts';
// import MyKudos from '../components/MyKudos';
import UserFollow from '../components/profileComponets/UserFollow';

export default function Profile() {
  const [userDetail, setUserDetail] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const { token, user_id, user_name } = useAuth();

  const [activeSection, setActiveSection] = useState('userInfo');

  const renderSection = () => {
    switch(activeSection) {
      case 'orders':
        return <MyOrders />;
      case 'comments':
        return <UserComments />;
      case 'discussion':
        return <UserPosts />;
      case 'kudos':
        return <MyOrders />;
      case 'followed':
        return <UserFollow />;
      case 'followers':
        return <MyOrders />;
      default:
        return <UserInfo userDetail={userDetail} onEdit={handleEdit} />;
    }
  };

  useEffect(() => {
    fetchUserDetail();
  }, [user_id]);

  const fetchUserDetail = async () => {
    try {
      const headers = {
        'Authorization': `Bearer ${token}`
      };
      const response = await axios.get(`http://localhost:3001/api/users/getUserInfo?user_id=${user_id}`, { headers });
      if(response.data.userDetail.user_first_name.length == 0 || response.data.userDetail.user_first_name === null){
        setIsEditing(true);
      } else {
        setUserDetail(response.data.userDetail);
        setError(null);
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      setError('Failed to fetch user data');
    }
  };

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setIsEditing(false);
    if (!userDetail) {
      fetchUserDetail();
    }
  };

  const handleSubmit = async (editedUser) => {
    try {
      await axios.post('http://localhost:3001/api/users/updateUserInfo', editedUser, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setUserDetail(editedUser);
      setIsEditing(false);
      setError(null);
    } catch (error) {
      console.error('Failed to update user data:', error);
      setError('Failed to update user data');
    }
  };

  if (isEditing) {
    return (
      <div className='pt-20'>
        <EditProfileForm
          userDetail={{
            user_id: user_id,
            user_name: userDetail?.user_name || user_name || '',
            user_gender: userDetail?.user_gender || 'prefer not to say',
            user_birthday: userDetail?.user_birthday || '',
            user_phone: userDetail?.user_phone || '',
            user_address: userDetail?.user_address || '',
          }}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    );
  }

  if (!userDetail) return <div>Loading...</div>;

  return (
      <div className="bg-gray-100 min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* User banner */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          <div className="bg-gray-200 h-28"></div>
          <div className="flex items-center p-6">
            <img src={require("../assets/images/zuo2.jpg")} alt="User Avatar" className="w-24 h-24 rounded-full border-4 border-white -mt-16" />
            <div className="ml-6">
              <h1 className="text-2xl font-bold text-gray-900">{user_name}</h1>
              {userDetail && (
                <p className="text-sm text-gray-600">
                  {userDetail.user_gender} • Joined {new Date(userDetail.created_at).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </div>
        </div>

      <div className="max-w-4xl mx-auto min-h-screen flex flex-col lg:flex-row sm:px-6 lg:px-8">
        {/* User Info Section */}
        <section
          aria-labelledby="summary-heading"
          className="bg-gray-100 lg:w-1/2 p-8 overflow-y-auto h-screen scrollbar-thin scrollbar-thumb-gray-400"
        >
          <ul className="space-y-4">
              {['User Info', 'Orders', 'Comments', 'Discussion', 'KUDOS', 'Followed', 'Followers'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => setActiveSection(item.toLowerCase().replace(' ', ''))}
                    className={`w-full text-left py-2 px-4 rounded-md transition-colors duration-200 ${
                      activeSection === item.toLowerCase().replace(' ', '')
                        ? 'bg-gray-200 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
        </section>

        {/* Function rendering section */}
        <section className="lg:w-2/3 bg-white shadow-md rounded-lg p-6">
            {renderSection()}
          </section>
      </div>
    </div>
  );
}
