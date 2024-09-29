import React, { useState } from 'react';
import { UserIcon } from '@heroicons/react/24/outline'

export default function EditProfileForm({ userDetail, onSubmit, onCancel }) {

  const [editedUser, setEditedUser] = useState(userDetail);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setEditedUser({ ...editedUser, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(editedUser);
  };

  const user_id = localStorage.getItem('user_id');

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <div className="mb-6">
          <div className="flex items-center pb-4">
            <UserIcon className="w-10 h-10 mr-2 text-gray-500" />
            <h3 className="text-2xl font-semibold text-gray-900">
              Edit Profile
            </h3>
          </div>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="user_first_name" className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                id="user_first_name"
                name="user_first_name"
                value={editedUser.user_first_name}
                onChange={handleChange}
                placeholder={userDetail.user_first_name}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="user_last_name" className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="user_last_name"
                name="user_last_name"
                value={editedUser.user_last_name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="user_phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="user_phone"
                name="user_phone"
                value={editedUser.user_phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="user_gender"
                    value="female"
                    checked={editedUser.user_gender === 'female'}
                    onChange={handleChange}
                    className="form-radio h-4 w-4 text-gray-600"
                  />
                  <span className="ml-2">Female</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="user_gender"
                    value="male"
                    checked={editedUser.user_gender === 'male'}
                    onChange={handleChange}
                    className="form-radio h-4 w-4 text-gray-600"
                  />
                  <span className="ml-2">Male</span>
                </label>
              </div>
            </div>
            <div className="col-span-6">
              <label htmlFor="user_address" className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <textarea
                id="user_address"
                name="user_address"
                rows="3"
                value={editedUser.user_address}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
            Cancel
          </button>
          <button type="submit" onSubmit={editedUser} className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}