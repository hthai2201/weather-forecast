import { StorageKeys } from '@/constants/storage';
import EncryptedStorage from './storage';
import { ISearchHistoryItem } from '@/types/searchHistory';
import { GeoLocation } from '@/types/openWeatherMap';
import { getLocationName } from '@/utils/openWeatherMap';

class SearchHistoryStorage {
  static storageKey = StorageKeys.searchHistory;
  static storage = EncryptedStorage;
  static maxItems = 100;
  static appendItem(geo: GeoLocation) {
    const currentItems = this.getItems();
    const location = getLocationName(geo);
    const newItems = [
      { time: Date.now(), ...geo, location },
      ...currentItems.filter(item => item.location !== location),
    ].slice(0, this.maxItems);
    this.storage.setItem(this.storageKey, newItems);
    return newItems;
  }
  static removeItem(geo: GeoLocation) {
    const currentItems = this.getItems();
    const location = getLocationName(geo);
    const newItems = currentItems.filter(item => item.location !== location);
    this.storage.setItem(this.storageKey, newItems);
    return newItems;
  }
  static getItems(): ISearchHistoryItem[] {
    return this.storage.getItem<ISearchHistoryItem[]>(this.storageKey) || [];
  }
}

export default SearchHistoryStorage;
