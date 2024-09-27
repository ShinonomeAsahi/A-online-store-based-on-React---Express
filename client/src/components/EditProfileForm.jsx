import React, { useState } from 'react';

export default function EditProfileForm({ userDetail, onSubmit, onCancel }) {
  const [editedUser, setEditedUser] = useState(userDetail);

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(editedUser);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Add input fields for each editable user detail */}
      <div>
        <label htmlFor="user_first_name" className="block text-sm font-medium text-gray-700">First Name</label>
        <input
          type="text"
          id="user_first_name"
          name="user_first_name"
          value={editedUser.user_first_name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      {/* Add more input fields for other user details */}
      <div className="flex space-x-4">
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">Cancel</button>
      </div>
    </form>
  );
}