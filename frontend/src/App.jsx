// App.js
import React, { useState, useCallback } from 'react';
import Leaderboard from './components/Leaderboard';
import UserSelection from './components/UserSelection';
import ClaimButton from './components/ClaimButton';
import ClaimHistory from './components/ClaimHistory';
import TabNavigation from './components/TabNavigation';
import useUsers from './hooks/useUsers';
import useClaimHistory from './hooks/useClaimHistory';
import useClaimPoints from './hooks/useClaimPoints';
import SuccessPopup from './components/Success';

function App() {
  const [activeTab, setActiveTab] = useState('leaderboard');

  const {
    users,
    leaderboardLoading,
    hasMoreUsers, // New prop
    loadMoreUsers, // New prop
    addUser,
    refetchUsers// Renamed to fetchUsersAndLeaderboard for external re-fetching
  } = useUsers();

  const {
    claimHistory,
    claimHistoryPage,
    claimHistoryTotalPages,
    claimHistoryLoading,
    handleClaimHistoryPageChange,
    handleClaimHistorySearch,
    fetchClaimHistory
  } = useClaimHistory();
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccess,setShowSuccess]=useState(false)

 const handleClaimSuccess = useCallback((name, points) => {
    setSuccessMessage(`🎉 Successfully claimed ${points} points for ${name}!`);
    setShowSuccess(true);
    refetchUsers();
    fetchClaimHistory();
  }, [refetchUsers, fetchClaimHistory]);

  const {
    claimPoints: handleClaimPoints,
    claimPointsLoading,
  } = useClaimPoints(handleClaimSuccess);

  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleSelectUser = useCallback((userId) => {
    setSelectedUserId(userId);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 font-inter p-4 flex flex-col items-center">
      <h1 className="text-4xl mt-10 sm:mt-2 sm:text-5xl font-extrabold text-blue-800 mb-6 sm:mb-10 text-center drop-shadow-xl">
        Global Leaderboard App
      </h1>

      <TabNavigation activeTab={activeTab} onSelectTab={setActiveTab} />

      <div className="w-full max-w-6xl">
        {activeTab === 'leaderboard' && (
          <Leaderboard
            users={users}
            isLoading={leaderboardLoading}
            hasMoreUsers={hasMoreUsers} // Pass new prop
            loadMoreUsers={loadMoreUsers} // Pass new prop
            // currentPage, totalPages, onPageChange are no longer needed
          />
        )}

        {activeTab === 'manage-users' && (
          <div className="grid grid-cols-1 w-full max-w-4xl mx-auto">
            <UserSelection
              users={users}
              selectedUserId={selectedUserId}
              onSelectUser={handleSelectUser}
              onAddUser={addUser}
            />

            <ClaimButton
              selectedUserId={selectedUserId}
              onClaimPoints={handleClaimPoints}
              isLoading={claimPointsLoading}
            />
          </div>
        )}

        {activeTab === 'claim-history' && (
          <ClaimHistory
            history={claimHistory}
            currentPage={claimHistoryPage}
            totalPages={claimHistoryTotalPages}
            onPageChange={handleClaimHistoryPageChange}
            onSearch={handleClaimHistorySearch}
            isLoading={claimHistoryLoading}
          />
        )}
      </div>

      <footer className="mt-12 text-center text-gray-600 text-sm py-6 border-t border-gray-300 dark:border-white/20">
  <p>
    Built  by{' '}
    <a
      href="https://avinash-chaturvedi.vercel.app/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline dark:text-blue-400"
    >
      Avinash Chaturvedi
    </a>{' '}
    for the 3W Internship Assignment
  </p>
</footer>

      <SuccessPopup
        message={successMessage}
        show={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
    </div>
  );
}

export default App;