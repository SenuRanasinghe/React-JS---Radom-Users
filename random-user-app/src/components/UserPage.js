import React from 'react';
import { useLocation } from 'react-router-dom';

function UserPage() {
  const location = useLocation();
  const user = location.state?.user; // Retrieve user data from state

  if (!user) return <div>Loading...</div>;

  return (
    <div className="flex justify-center items-center h-screen bg-purple-200"> {/* Light purple background */}
      <div className="max-w-lg w-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 text-white shadow-lg rounded-lg overflow-hidden"> {/* Larger card */}
        <div className="flex justify-center mt-6">
          <img 
            className="w-40 h-40 object-cover rounded-full border-4 border-white" /* Larger image */
            src={user.picture.large} 
            alt={user.name.first} 
          />
        </div>
        <div className="p-8 text-center"> {/* Increased padding */}
          <h2 className="text-3xl font-bold mb-4">{user.name.first} {user.name.last}</h2> {/* Larger text */}
          <p className="text-xl">{user.email}</p> {/* Larger text */}
          <p className="mt-2 text-md">{user.location.street.number} {user.location.street.name}, {user.location.city}, {user.location.state}, {user.location.country}</p> {/* Adjusted text size */}
          <p className="mt-2 text-md">{user.phone}</p> {/* Adjusted text size */}
        </div>
      </div>
    </div>
  );
}

export default UserPage;
