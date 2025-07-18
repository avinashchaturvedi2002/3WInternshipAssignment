import React, { useState } from 'react';

const UserSelection = React.memo(({ users, selectedUserId, onSelectUser, onAddUser }) => {
  const [newUserName, setNewUserName] = useState('');

  const handleAddUser = () => {
    if (newUserName.trim()) {
      onAddUser(newUserName.trim());
      setNewUserName('');
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-xl mb-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Manage Users</h2>
      <div className="mb-4">
        <label htmlFor="user-select" className="block text-gray-700 text-sm font-semibold mb-2">
          Select User:
        </label>
        <select
          id="user-select"
          className="shadow-sm border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          value={selectedUserId || ''}
          onChange={(e) => onSelectUser(e.target.value)}
        >
          <option value="" disabled>Select a user</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="new-user-name" className="block text-gray-700 text-sm font-semibold mb-2">
          Add New User:
        </label>
        <input
          type="text"
          id="new-user-name"
          className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          placeholder="Enter new user name"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
        />
      </div>
      <button
        onClick={handleAddUser}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 w-full transition duration-200 ease-in-out transform hover:scale-105"
      >
        Add User
      </button>
    </div>
  );
});

export default UserSelection;