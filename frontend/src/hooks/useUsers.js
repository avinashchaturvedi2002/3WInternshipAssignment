import { useState, useEffect, useCallback } from 'react';
import apiService from '../api/apiService';

const USERS_PER_FETCH = 10;

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMoreUsers, setHasMoreUsers] = useState(true);
  const [leaderboardLoading, setLeaderboardLoading] = useState(false);

  const fetchUsers = useCallback(async (currentPage) => {
    if (leaderboardLoading || !hasMoreUsers) return;

    setLeaderboardLoading(true);
    try {
      const data = await apiService.getUsers(currentPage, USERS_PER_FETCH);
      setUsers((prevUsers) => {
        const newUsers = data.users.filter(
          (newUser) => !prevUsers.some((existingUser) => existingUser._id === newUser._id)
        );
        return [...prevUsers, ...newUsers];
      });
      setHasMoreUsers(data.hasMore);
      setPage(currentPage + 1);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLeaderboardLoading(false);
    }
  }, [leaderboardLoading, hasMoreUsers]);

  useEffect(() => {
    fetchUsers(1);
  }, []);

  const loadMoreUsers = useCallback(() => {
    fetchUsers(page);
  }, [fetchUsers, page]);

  const refetchUsers = useCallback(async () => {
    setUsers([]);
    setPage(1);
    setHasMoreUsers(true);
    await fetchUsers(1);
  }, [fetchUsers]);

  return {
    users,
    leaderboardLoading,
    hasMoreUsers,
    loadMoreUsers,
    refetchUsers,
  };
};

export default useUsers;
