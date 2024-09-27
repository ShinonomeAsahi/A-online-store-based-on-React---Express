import React from 'react';

export default function UserInfo({ userDetail, onEdit }) {
  return (
    <div className="space-y-4">
      <p><strong>Name:</strong> {userDetail.user_first_name} {userDetail.user_last_name}</p>
      <p><strong>Gender:</strong> {userDetail.user_gender}</p>
      <p><strong>Date of Birth:</strong> {userDetail.user_date_of_birth}</p>
      <p><strong>Address:</strong> {userDetail.user_address}</p>
      <p><strong>Phone Number:</strong> {userDetail.user_phone_number}</p>
    </div>
  );
}