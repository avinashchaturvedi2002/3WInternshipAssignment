import { useState, useEffect, useCallback } from 'react';
import apiService from '../api/apiService';

const USERS_PER_PAGE = 10; // Consistent page size

const useClaimHistory = () => {
  const [claimHistory, setClaimHistory] = useState([]);
  const [claimHistoryPage, setClaimHistoryPage] = useState(1);
  const [claimHistoryTotalPages, setClaimHistoryTotalPages] = useState(1);
  const [claimHistorySearchTerm, setClaimHistorySearchTerm] = useState('');
  const [claimHistoryLoading, setClaimHistoryLoading] = useState(true);

  const fetchClaimHistory = useCallback(async () => {
    setClaimHistoryLoading(true);
    try {
      const data = await apiService.getClaimHistory(claimHistoryPage, USERS_PER_PAGE, claimHistorySearchTerm);
      setClaimHistory(data.history);
      setClaimHistoryTotalPages(data.totalPages);
    } catch (error) {
      console.error('Failed to fetch claim history:', error);
      // You might want to set an error state here to display in the UI
    } finally {
      setClaimHistoryLoading(false);
    }
  }, [claimHistoryPage, claimHistorySearchTerm]);

  useEffect(() => {
    fetchClaimHistory();
  }, [fetchClaimHistory]);

  const handleClaimHistoryPageChange = useCallback((newPage) => {
    if (newPage > 0 && newPage <= claimHistoryTotalPages) {
      setClaimHistoryPage(newPage);
    }
  }, [claimHistoryTotalPages]);

  const handleClaimHistorySearch = useCallback((searchTerm) => {
    setClaimHistorySearchTerm(searchTerm);
    setClaimHistoryPage(1); // Reset to first page on new search
  }, []);

  useEffect(() => {
  console.log("Fetching claim history with:", {
    page: claimHistoryPage,
    searchTerm: claimHistorySearchTerm,
  });
  fetchClaimHistory();
}, [fetchClaimHistory]);
  return {
    claimHistory,
    claimHistoryPage,
    claimHistoryTotalPages,
    claimHistoryLoading,
    handleClaimHistoryPageChange,
    handleClaimHistorySearch,
    fetchClaimHistory, // Expose for re-fetching from other hooks/components
  };
};

export default useClaimHistory;