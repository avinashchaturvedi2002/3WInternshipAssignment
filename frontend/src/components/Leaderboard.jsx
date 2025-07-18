// components/Leaderboard.js
import React, { useEffect, useRef } from 'react'; // Import useRef
import { FaCrown, FaCoins } from 'react-icons/fa';

const Leaderboard = React.memo(({ users, isLoading, hasMoreUsers, loadMoreUsers }) => { // Remove currentPage, totalPages, onPageChange
  const top3Users = users.slice(0, 3);
  const otherUsers = users.slice(3);
  const loader = useRef(null); // Ref for the loading indicator element

  const getInitials = (name) => {
    if (!name) return '';
    const parts = name.split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  };

  useEffect(() => {
    const options = {
      root: null, 
      rootMargin: '20px', 
      threshold: 1.0 
    };

    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMoreUsers && !isLoading) {
        loadMoreUsers();
      }
    }, options);

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [hasMoreUsers, isLoading, loadMoreUsers]); // Dependencies for useEffect

  return (
    <div className="p-4 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-2xl mb-6 w-full max-w-4xl mx-auto text-white">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-white drop-shadow-lg">
        <i className="fas fa-trophy mr-2 text-yellow-300"></i> Leaderboard
      </h2>

      {users.length === 0 && !isLoading ? (
        <p className="text-center text-white text-lg">No users on the leaderboard yet. Add some!</p>
      ) : (
        <>
          <div className="flex justify-center items-end space-x-2 sm:space-x-4 mb-8">
            {top3Users[1] && ( // 2nd Place
              <div className="flex flex-col items-center p-2 sm:p-4 bg-white bg-opacity-20 rounded-xl shadow-lg transform -translate-y-2 sm:-translate-y-4 transition-all duration-300 hover:scale-105 w-28 sm:w-auto">
                <div><FaCrown className='text-gray-400 w-8 h-8' /></div>
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-full flex items-center justify-center text-gray-800 text-lg sm:text-xl font-bold mb-1 sm:mb-2 border-4 border-gray-400">
                  {getInitials(top3Users[1].name)}
                </div>
                <span className="text-base sm:text-xl font-bold text-gray-400 mb-0.5 sm:mb-1 text-center">{top3Users[1].name}</span>
                <span className="text-base sm:text-xl text-yellow-300 font-semibold flex items-center space-x-4">
                  <span> {top3Users[1].totalPoints}</span> <FaCoins />
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-gray-400 mt-1 sm:mt-2 drop-shadow-md">2</div>
              </div>
            )}
            {top3Users[0] && ( // 1st Place
              <div className="flex flex-col items-center p-3 sm:p-6 bg-white bg-opacity-30 rounded-xl shadow-2xl border-4 border-yellow-400 transform scale-105 sm:scale-110 transition-all duration-300 hover:scale-115 w-32 sm:w-auto">
                <div><FaCrown className='text-yellow-500 w-10 h-10' /></div>
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-800 text-xl sm:text-2xl font-bold mb-1 sm:mb-2 border-4 border-yellow-500">
                  {getInitials(top3Users[0].name)}
                </div>
                <span className="text-lg sm:text-2xl font-bold text-yellow-500 mb-0.5 sm:mb-1 text-center">{top3Users[0].name}</span>
                <span className="text-base sm:text-xl text-yellow-300 font-semibold flex items-center space-x-4">
                  <span> {top3Users[0].totalPoints}</span> <FaCoins />
                </span>
                <div className="text-4xl sm:text-5xl font-extrabold text-yellow-300 mt-1 sm:mt-2 drop-shadow-md">1</div>
              </div>
            )}
            {top3Users[2] && ( // 3rd Place
              <div className="flex flex-col items-center p-2 sm:p-4 bg-white bg-opacity-20 rounded-xl shadow-lg transform -translate-y-2 sm:-translate-y-4 transition-all duration-300 hover:scale-105 w-28 sm:w-auto">
                <div><FaCrown className='text-yellow-800 w-6 h-6' /></div>
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-full flex items-center justify-center text-gray-800 text-lg sm:text-xl font-bold mb-1 sm:mb-2 border-4 border-yellow-600">
                  {getInitials(top3Users[2].name)}
                </div>
                <span className="text-base sm:text-xl font-bold text-yellow-800 mb-0.5 sm:mb-1 text-center">{top3Users[2].name}</span>
                <span className="text-base sm:text-xl text-yellow-300 font-semibold flex items-center space-x-4">
                  <span> {top3Users[2].totalPoints}</span> <FaCoins />
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-yellow-600 mt-1 sm:mt-2 drop-shadow-md">3</div>
              </div>
            )}
          </div>

          {otherUsers.length > 0 && (
            <div className="bg-white shadow-md rounded-md overflow-hidden md:w-3/4 mx-auto mt-16">
              <ul className="divide-y divide-gray-200">
                {otherUsers.map((user,index) => (
                  <li key={user._id} className="flex items-center py-4 px-6 hover:bg-gray-50 transition duration-150 ease-in-out">
                    <span className="text-gray-700 text-lg font-semibold mr-4 w-6 text-center">{index+4}</span>
                    <img
                      className="w-12 h-12 rounded-full object-cover mr-4"
                      src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                      alt={`${user.name}'s avatar`}
                    />
                    <div className="flex-1 flex justify-between items-center">
                      <h3 className="text-lg font-medium text-gray-800">{user.name}</h3>
                      <p className="text-gray-600 text-base flex items-center">
                        <i className="fas fa-fire mr-1 text-yellow-500"></i>
                        {user.totalPoints} points
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Loading Indicator / Scroll Trigger */}
          <div ref={loader} className="p-4 text-center">
            {isLoading && <p className="text-center text-white text-lg">Loading more users...</p>}
            {!hasMoreUsers && users.length > 0 && !isLoading && (
              <p className="text-center text-white text-lg">You've reached the end of the leaderboard.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
});

export default Leaderboard;