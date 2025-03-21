import { GeoLocation } from './openWeatherMap';

export interface ISearchHistoryItem extends GeoLocation {
  time: number;
  location: string;
}
