import React from 'react';
import { FaTrophy, FaUsers, FaHistory } from 'react-icons/fa';

const TabNavigation = ({ activeTab, onSelectTab }) => {
  const tabs = [
    { id: 'leaderboard', name: 'Leaderboard', icon: <FaTrophy /> },
    { id: 'manage-users', name: 'Manage Users', icon: <FaUsers className='w-6 h-6'/> },
    { id: 'claim-history', name: 'Claim History', icon: <FaHistory /> },
  ];

  return (
    <>
      
      <div className="sm:hidden fixed top-0 z-50 w-full bg-white border-b border-gray-200 shadow">
        <div className="flex justify-around ">
          {tabs.map((tab) => (
            <div className='rounded-full p-2 ease-in-out duration-300 hover:bg-gray-400'>
              <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center text-xl p-2 transition-colors duration-200 
                ${activeTab === tab.id ? 'text-blue-600' : 'text-gray-500'}`}
            >
              {tab.icon}
            </button>
            </div>
            
          ))}
        </div>
      </div>

      
      <div className="hidden  z-10 sm:flex w-full max-w-4xl mx-auto mb-8 ">
        <div className="flex border-b border-gray-300  whitespace-nowrap w-full">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`py-3 px-6 -mb-px border-b-2 font-medium text-lg focus:outline-none transition-colors duration-200
                ${activeTab === tab.id
                  ? 'border-blue-600 text-blue-700 font-semibold'
                  : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-400'
                }`}
              onClick={() => onSelectTab(tab.id)}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default TabNavigation;
