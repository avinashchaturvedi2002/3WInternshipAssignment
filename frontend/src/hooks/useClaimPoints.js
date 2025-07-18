import { useState, useCallback } from 'react';
import apiService from '../api/apiService';

const useClaimPoints = (onSuccess) => {
  const [claimPointsLoading, setClaimPointsLoading] = useState(false);
  const [claimError, setClaimError] = useState(null);

  const claimPoints = useCallback(async (userId) => {
    setClaimPointsLoading(true);
    setClaimError(null);
    try {
      const response = await apiService.claimPoints(userId);
      if (onSuccess) {
        onSuccess(response.user.name,response.points); // Callback to trigger re-fetches in parent components
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      setClaimError(errorMessage);
      alert(`Failed to claim points: ${errorMessage}`);
    } finally {
      setClaimPointsLoading(false);
    }
  }, [onSuccess]);

  return {
    claimPoints,
    claimPointsLoading,
    claimError,
  };
};

export default useClaimPoints;