import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function HomePage() {
  const [users, setUsers] = useState([]);
  const [previousUsers, setPreviousUsers] = useState([]); // State to track previously fetched users
  const [newFacesCount, setNewFacesCount] = useState(0); // State to track the count of new faces
  const [gender, setGender] = useState('');

  const fetchUsers = async () => {
    const response = await axios.get('https://randomuser.me/api/?results=45');
    const fetchedUsers = response.data.results;

    // Identify new users
    const newUsers = fetchedUsers.filter(user => !previousUsers.some(prevUser => prevUser.login.uuid === user.login.uuid));

    setUsers(fetchedUsers);
    setPreviousUsers(prev => [...prev, ...fetchedUsers]); // Update previous users
    setNewFacesCount(newUsers.length); // Set count of new faces
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleGenderChange = (gender) => {
    setGender(gender);
  };

  const filteredUsers = users.filter(user => gender === '' || user.gender === gender);
  const displayedUsers = filteredUsers.slice(0, 45);

  return (
    <div className="container mx-auto p-4">
      {/* Header section */}
      <div className="flex flex-col items-start mb-4">
        <div className="flex justify-between items-center w-full mb-4">
          <h1 className="text-2xl font-bold">Faces</h1>
          <button
            onClick={fetchUsers}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Generate new users
          </button>
        </div>

        {/* New Faces and Filter buttons section */}
        <div className="flex justify-between items-center mb-4">
          {/* New Faces section */}
          <div className="text-lg">
            {newFacesCount} new faces
          </div>

          {/* Filter buttons section */}
          <div className="flex items-center space-x-4 ml-80"> {/* Added margin-left */}
            <span className="text-lg font-semibold">Show:</span>
            <button
              onClick={() => handleGenderChange('')}
              className={`border rounded-full p-2 ${gender === '' ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
            >
              All
            </button>
            <button
              onClick={() => handleGenderChange('male')}
              className={`border rounded-full p-2 ${gender === 'male' ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
            >
              Gents
            </button>
            <button
              onClick={() => handleGenderChange('female')}
              className={`border rounded-full p-2 ${gender === 'female' ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
            >
              Ladies
            </button>
          </div>
        </div>

        {/* Users grid */}
        <div className="grid grid-cols-9 gap-4">
          {displayedUsers.map(user => (
            <Link
              to={`/user/${user.login.uuid}`}
              key={user.login.uuid}
              state={{ user }} // Pass the user object as state
              className="block"
            >
              <div className="border rounded flex justify-center">
                <img
                  src={user.picture.large}
                  alt={user.name.first}
                  className="rounded object-cover w-full h-full"
                  style={{ aspectRatio: '1 / 1' }} // Maintain square shape
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
