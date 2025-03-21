import SearchHistoryStorage from '@/storages/searchHistoryStorage';
import { ISearchHistoryItem } from '@/types/searchHistory';
import { useCallback, useEffect, useState } from 'react';

const useGetSearchHistory = () => {
  const [data, setData] = useState<ISearchHistoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const refresh = useCallback(() => {
    try {
      const currentItems = SearchHistoryStorage.getItems();
      setData(currentItems);
      setError(null);
    } catch (error: any) {
      setError(error.message);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
    const handler = (e: StorageEvent) => {
      if (e.key === SearchHistoryStorage.storageKey) {
        refresh();
      }
    };
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener('storage', handler);
    };
  }, []);

  return {
    data,
    loading,
    error,
    refresh,
    setData,
  };
};

export default useGetSearchHistory;
