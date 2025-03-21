import useGetSearchHistory from '@/hooks/storage/useGetSearchHistory';
import { Loader2, SearchIcon } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import SearchHistoryItem from './SearchHistoryItem';

const SearchHistory = () => {
  const {
    data: searchHistoryData,
    loading,
    error,
    refresh,
    setData,
  } = useGetSearchHistory();
  const [searchQuery, setSearchQuery] = useState('');

  // Add time update effect
  useEffect(() => {
    const interval = setInterval(() => {
      // Force refresh to update time ago display
      refresh();
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [refresh]);

  const filteredSearchHistoryData = useMemo(() => {
    if (!searchQuery) {
      return searchHistoryData;
    }
    return searchHistoryData.filter(item =>
      item.location.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchHistoryData, searchQuery]);

  return (
    <div className="inset-shadow-md flex h-full justify-center bg-slate-100 bg-gradient-to-b from-blue-100 to-blue-50 p-4 pt-6">
      <div className="flex min-h-0 w-full max-w-md flex-col">
        <div className="mb-2 flex gap-2">
          <div className="relative w-full">
            <Input
              placeholder="Search city or country"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-white pl-8"
            />
            <SearchIcon className="absolute top-1/2 left-1.5 h-4 w-4 -translate-y-1/2 transform text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>

        <h3 className="pt-4 pb-2 font-medium">Search History</h3>

        <Card className="min-h-32 overflow-y-auto bg-white py-0">
          <CardContent className="flex flex-1 flex-col p-2">
            {loading && (
              <div className="flex flex-1 flex-col items-center justify-center py-4">
                <Loader2 className="mb-3 h-10 w-10 animate-spin text-gray-400" />
                <p className="text-sm text-gray-500">Loading history data...</p>
              </div>
            )}
            {!loading && error && (
              <div className="flex flex-1 flex-col items-center justify-center py-4">
                <p className="text-sm text-red-500">{error}</p>
              </div>
            )}
            {!loading && !error && !filteredSearchHistoryData.length && (
              <div className="flex h-full flex-1 flex-col items-center justify-center py-4">
                <p className="text-sm text-gray-500">No search history found</p>
              </div>
            )}
            {!loading && !error && filteredSearchHistoryData.length > 0 && (
              <div className="space-y-1">
                {filteredSearchHistoryData.map(item => (
                  <SearchHistoryItem
                    key={item.location}
                    item={item}
                    setData={setData}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SearchHistory;
