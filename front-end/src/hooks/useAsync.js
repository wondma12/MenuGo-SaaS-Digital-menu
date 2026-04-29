import { useState, useEffect, useCallback } from 'react';

// Custom hook for handling async operations
export const useAsync = (asyncFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await asyncFunction(...args);
      setData(result);
      return { success: true, data: result };
    } catch (err) {
      setError(err.message || 'An error occurred');
      return { success: false, error: err.message || 'An error occurred' };
    } finally {
      setLoading(false);
    }
  }, dependencies);

  // Reset function
  const reset = useCallback(() => {
    setData(null);
    setLoading(false);
    setError(null);
  }, []);

  return { data, loading, error, execute, reset };
};
