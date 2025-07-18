import React, { useState } from 'react';

const ClaimHistory = React.memo(({ history, currentPage, totalPages, onPageChange, onSearch, isLoading }) => {
  const [searchUserName, setSearchUserName] = useState('');

  const handleSearch = () => {
    onSearch(searchUserName.trim());
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-xl w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Claim History</h2>

      <div className="mb-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        <input
          type="text"
          className="shadow-sm appearance-none border border-gray-300 rounded-lg flex-grow py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          placeholder="Search by user name"
          value={searchUserName}
          onChange={(e) => setSearchUserName(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-200 ease-in-out transform hover:scale-105"
        >
          Search
        </button>
        {searchUserName && (
          <button
            onClick={() => { setSearchUserName(''); onSearch(''); }}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition duration-200 ease-in-out transform hover:scale-105"
          >
            Clear
          </button>
        )}
      </div>

      {isLoading ? (
        <p className="text-center text-gray-500 text-lg">Loading claim history...</p>
      ) : history.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No claim history found.</p>
      ) : (
        <>
          <div className="overflow-x-auto"> 
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-inner">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">User</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Points Claimed</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {history.map((claim) => (
                  <tr key={claim._id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                    <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-900">{claim.userId ? claim.userId.name : 'Unknown User'}</td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-700">{claim.pointsClaimed}</td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(claim.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center mt-4 space-x-2">
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed transition duration-200 hover:bg-blue-600"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-gray-700 font-semibold">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed transition duration-200 hover:bg-blue-600"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
});

export default ClaimHistory;