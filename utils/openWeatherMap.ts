import { GeoLocation } from '@/types/openWeatherMap';

// Weather icons mapping
export const getWeatherIcon = (icon: string) => {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
};

export function getLocationName(location?: GeoLocation) {
  if (!location) {
    return '';
  }
  return `${location.name}, ${location.country}`;
}
