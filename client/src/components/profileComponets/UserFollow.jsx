import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../provider/AuthProvider";

export default function UserFollow({ user }) {
  const [follow, setFollow] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { token, user_id } = useAuth();

  const fetchFollow = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3001/api/users/getUserFollow`,
        {
          params: { user_id: user_id },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setFollow(response.data);
    } catch (error) {
      console.error("Error fetching user follow:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 发生变化时重新获取数据
  useEffect(() => {
    if (user_id && token) {
      fetchFollow();
    }
  }, [user_id, token]);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mb-4">
      {follow.map((follow) => (
        <div key={follow._id} className="p-4 border-b last:border-b-0">
          <h3 className="font-bold text-lg mb-2">
            {follow.followed_user_id.user_name}
          </h3>
          <p className="text-gray-600">
            {"Since: " + new Date(follow.created_at).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
