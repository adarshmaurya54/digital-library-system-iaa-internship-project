import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user } = useSelector((state) => state.auth)

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl flex flex-col md:flex-row items-center md:items-start gap-8">
      
      {/* Profile Pic */}
      <div className="flex-shrink-0">
        <div className="w-40 h-40 rounded-full border-4 border-blue-600 overflow-hidden shadow-md">
          <img
            src='https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* User Details */}
      <div className="flex-1 w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Profile Details</h2>
        <div className="space-y-3">
          <p className="text-lg text-gray-700"><span className="font-semibold">Name:</span> {user?.first_name} {user?.last_name}</p>
          <p className="text-lg text-gray-700"><span className="font-semibold">Email:</span> {user?.email}</p>
          <p className="text-lg text-gray-700"><span className="font-semibold">Role:</span> {user?.role}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
