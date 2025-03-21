/**
 * OpenWeatherMap 5-day forecast API response
 */
export interface Forecast5Response {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastItem[];
  city: CityInfo;
}

/**
 * Individual forecast item (3-hour period)
 */
export interface ForecastItem {
  dt: number; // Unix timestamp
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number; // Temperature Kf
  };
  weather: WeatherCondition[];
  clouds: {
    all: number; // Cloudiness percentage
  };
  wind: {
    speed: number; // Wind speed in m/s
    deg: number; // Wind direction in degrees
    gust?: number; // Wind gust in m/s (optional)
  };
  visibility: number; // Visibility in meters
  rain?: {
    '3h'?: number; // Rain volume for 3 hours in mm (optional)
  };
  snow?: {
    '3h'?: number; // Snow volume for 3 hours in mm (optional)
  };

  // forecast-specific properties
  pop: number; // Probability of precipitation
  sys: {
    pod?: string; // Part of day ('d' for day, 'n' for night)
    type?: number; // Internal parameter
    id?: number; // Internal parameter
    country?: string; // Country code
    sunrise?: number; // Sunrise time, unix, UTC
    sunset?: number; // Sunset time, unix, UTC
  };
  dt_txt: string; // Date and time in text format

  // current weather-specific properties
  coord: {
    lon: number; // Longitude
    lat: number; // Latitude
  };
  base: string; // Internal parameter
  timezone: number; // Shift in seconds from UTC
  id: number; // City ID
  name: string; // City name
  cod: number; // Internal parameter
}

/**
 * Weather condition
 */
export interface WeatherCondition {
  id: number; // Weather condition ID
  main: string; // Group of weather parameters (Rain, Snow, etc.)
  description: string; // Weather condition description
  icon: string; // Weather icon ID
}

/**
 * City information
 */
export interface CityInfo {
  id: number; // City ID
  name: string; // City name
  coord: {
    lat: number; // Latitude
    lon: number; // Longitude
  };
  country: string; // Country code
  population: number; // City population
  timezone: number; // Shift in seconds from UTC
  sunrise: number; // Sunrise time, Unix UTC
  sunset: number; // Sunset time, Unix UTC
}

/**
 * OpenWeatherMap Geocoding API response
 * An array of location objects matching the search query
 */
export type GeocodingResponse = GeoLocation[];

/**
 * Individual location from Geocoding API
 */
export interface GeoLocation {
  name: string; // Name of the location
  local_names?: {
    // Names in different languages (optional)
    [languageCode: string]: string;
  };
  lat: number; // Latitude
  lon: number; // Longitude
  country: string; // Country code (e.g., "GB")
  state?: string; // State/region name (optional)
}
