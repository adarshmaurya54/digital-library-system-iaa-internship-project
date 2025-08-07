import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user } = useSelector((state) => state.auth)
  if (!user) return <div className="text-center mt-10">Loading...</div>;
  return (
    <div className="flex justify-center items-center md:py-5">
      <div className="bg-white p-8 md:rounded-2xl md:shadow-2xl w-full max-w-md text-center space-y-4">
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-indigo-500 text-white rounded-full flex items-center justify-center text-3xl font-bold">
            {user.first_name[0]}{user.last_name[0]}
          </div>
        </div>

        <h2 className="text-2xl font-bold">{user.first_name} {user.last_name}</h2>
        <p className="text-gray-500  leading-[3px] text-sm">{user.email}</p>

        <div className="mt-4">
          <span
            className={`inline-block px-4 py-1 rounded-full text-white text-sm font-medium ${user.role === 'Faculty' ? 'bg-green-500' : 'bg-blue-500'
              }`}
          >
            {user.role}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
