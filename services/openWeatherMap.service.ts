import {
  Forecast5Response,
  ForecastItem,
  GeocodingResponse,
} from '@/types/openWeatherMap';
import { getQueryParams } from '@/utils/service';
import fetcher from './fetcher';

type Headers = Record<string, string>;

class OpenWeatherMapService {
  private baseUrl = process.env.NEXT_PUBLIC_OPEN_WEATHER_MAP_BASE_URL || '';
  private apiKey = process.env.OPEN_WEATHER_MAP_API_KEY || '';
  headers: Headers = {
    'Content-Type': 'application/json',
  };

  async getCurrentWeather(lat: string, lon: string) {
    const query = getQueryParams(
      {
        lat,
        lon,
        appid: this.apiKey,
        units: 'metric',
        lang: 'en',
      },
      true,
    );

    return fetcher<ForecastItem>(`${this.baseUrl}/data/2.5/weather${query}`, {
      headers: this.headers,
    });
  }
  async getForecast5(lat: string, lon: string) {
    const query = getQueryParams(
      {
        lat,
        lon,
        appid: this.apiKey,
        units: 'metric',
        lang: 'en',
      },
      true,
    );

    return fetcher<Forecast5Response>(
      `${this.baseUrl}/data/2.5/forecast${query}`,
      {
        headers: this.headers,
      },
    );
  }
  async searchLocations(city: string) {
    const query = getQueryParams(
      {
        q: city,
        units: 'metric',
        lang: 'en',
        appid: this.apiKey,
      },
      true,
    );

    return fetcher<GeocodingResponse>(
      `${this.baseUrl}/geo/1.0/direct${query}`,
      {
        headers: this.headers,
      },
    );
  }
}
export const openWeatherMapService = new OpenWeatherMapService();
