import { getQueryParams } from '@/utils/service';
import fetcher from './fetcher';
import { GeoParams } from '@/types/params';
import { ForecastItem } from '@/types/openWeatherMap';
import { BEApiPaths } from './api.paths';

type Headers = Record<string, string>;

class ApiService {
  private baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
  headers: Headers = {
    'Content-Type': 'application/json',
  };

  async getCurrentWeather(query: GeoParams) {
    const queryStr = getQueryParams(
      {
        lat: query.lat,
        lon: query.lon,
      },
      true,
    );

    return fetcher<ForecastItem>(
      `${this.baseUrl}${BEApiPaths.getCurrentWeather}${queryStr}`,
      {
        headers: this.headers,
      },
    );
  }
  async getForecast5(query: GeoParams) {
    const queryStr = getQueryParams(
      {
        lat: query.lat,
        lon: query.lon,
      },
      true,
    );

    return fetcher<ForecastItem>(
      `${this.baseUrl}${BEApiPaths.getForecast5}${queryStr}`,
      {
        headers: this.headers,
      },
    );
  }
  async getGeo(q: string) {
    const queryStr = getQueryParams(
      {
        q,
      },
      true,
    );

    return fetcher<ForecastItem>(
      `${this.baseUrl}${BEApiPaths.getGeo}${queryStr}`,
      {
        headers: this.headers,
      },
    );
  }
}
export const apiService = new ApiService();
