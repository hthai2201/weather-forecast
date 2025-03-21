import { ISearchHistoryItem } from '@/types/searchHistory';
import { Search, Trash2 } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';
import { formatDistanceToNowStrict } from 'date-fns';
import SearchHistoryStorage from '@/storages/searchHistoryStorage';
import { useRouter } from 'next/navigation';
import { getQueryParams } from '@/utils/service';

interface Props {
  item: ISearchHistoryItem;
  setData: React.Dispatch<React.SetStateAction<ISearchHistoryItem[]>>;
}
const SearchHistoryItem = (props: Props) => {
  const { item, setData } = props;
  const router = useRouter();

  const removeHistoryItem = (item: ISearchHistoryItem) => {
    const newItems = SearchHistoryStorage.removeItem(item);
    setData(newItems);
  };

  const selectHistoryItem = (item: ISearchHistoryItem) => {
    const url = `/${getQueryParams(
      {
        lat: item.lat,
        lon: item.lon,
        location: item.location,
      },
      true,
    )}`;
    router.push(url);
  };

  return (
    <div
      className="flex cursor-pointer items-center justify-between px-2 py-1 hover:bg-slate-50"
      onClick={() => selectHistoryItem(item)}
    >
      <div
        className="flex-1 cursor-pointer"
        onClick={() => selectHistoryItem(item)}
      >
        {item.location}
      </div>
      <div className="mr-4 text-sm text-gray-500">
        {formatDistanceToNowStrict(item.time, {
          addSuffix: true,
        })}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 cursor-pointer"
          onClick={() => selectHistoryItem(item)}
        >
          <Search className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 cursor-pointer"
          onClick={e => {
            removeHistoryItem(item);
            e.stopPropagation();
          }}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default SearchHistoryItem;
