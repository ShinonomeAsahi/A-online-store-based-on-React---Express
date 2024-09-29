import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../provider/AuthProvider';

const ListItem = ({ author }) => {
  const { token, user_id } = useAuth();
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkFollowStatus = async () => {
      if (!user_id) return;

      try {
        const response = await axios.get(`http://localhost:3001/api/users/getUserFollow`, {
          params: { user_id: user_id },
          headers: { 'Authorization': `Bearer ${token}` }
        });

        const isAlreadyFollowing = response.data.some(follow => 
          follow.followed_user_id._id === author._id
        );
        setIsFollowing(isAlreadyFollowing);
      } catch (error) {
        console.error('Error checking follow status:', error);
      }
    };

    checkFollowStatus();
  }, [user_id, author._id]);

  const handleFollow = async () => {
    if (!user_id) {
      console.error('User not logged in');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/api/users/followUser', {
        followerId: user_id,
        followingId: author._id
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.data.success) {
        setIsFollowing(true);
        console.log('Successfully followed user');
      }
    } catch (error) {
      console.error('Error following user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const randomInt = Math.floor(Math.random() * 9) + 1;

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-300">
      <div className="flex items-center">
        <img
          src={require(`../../../assets/images/avatar/0${randomInt}.png`)}
          alt={author.user_name}
          className="w-8 h-8 rounded-full mr-3"
        />
        <span className="font-bold text-gray-800">{author.user_name}</span>
      </div>
      <button 
        className={`${
          isFollowing 
            ? 'bg-gray-200 text-gray-800 text-sm'
            : 'bg-gray-600 text-white text-sm hover:bg-gray-500'
        } py-1 px-2 rounded transition`}
        onClick={handleFollow}
        disabled={isLoading || isFollowing}
        style={{ cursor: isFollowing ? 'default' : 'pointer' }}
      >
        {isLoading ? 'Loading...' : (isFollowing ? 'Followed' : 'Follow')}
      </button>
    </div>
  );
};

export default ListItem;