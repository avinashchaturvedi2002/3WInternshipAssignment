import React from 'react';

const ClaimButton = React.memo(({ selectedUserId, onClaimPoints, isLoading }) => {
  const handleClick = () => {
    if (selectedUserId) {
      onClaimPoints(selectedUserId);
    } else {
      alert('Please select a user first!');
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-xl mb-6 w-full max-w-md mx-auto">
      <button
        onClick={handleClick}
        disabled={!selectedUserId || isLoading}
        className={`py-3 px-6 rounded-lg font-bold text-lg transition duration-200 ease-in-out w-full
          ${!selectedUserId || isLoading
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-inner'
            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg transform hover:scale-105'
          }`}
      >
        {isLoading ? 'Claiming...' : 'Claim Random Points'}
      </button>
      {isLoading && <p className="text-sm text-gray-500 mt-2">Processing your claim...</p>}
    </div>
  );
});

export default ClaimButton;