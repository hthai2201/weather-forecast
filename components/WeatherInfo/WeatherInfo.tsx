// src/components/WeatherApp.tsx
'use client';
import React, { useState } from 'react';
import LocationSearch from './LocationSearch';
import CurrentWeatherCard from './CurrentWeatherCard';
import ForecastSection from './ForecastSection';
import useGetCurrentWeather from '@/hooks/apis/useGetCurrentWeather';
import useGetForecast5 from '@/hooks/apis/useGetForecast5';
import useGetGeo from '@/hooks/apis/useGetGeo';
import { GeoLocation } from '@/types/openWeatherMap';
import { useDebounceValue } from '@/hooks/useDebounceValue';
import { DEFAULT_GEOLOCATION, DEFAULT_LOCATION } from '@/constants/default';
import SearchHistoryStorage from '@/storages/searchHistoryStorage';

interface WeatherInfoProps {
  location?: string;
  lat?: string;
  lon?: string;
}
const WeatherInfo = (props: WeatherInfoProps) => {
  const { location: initialLocation, lat: initialLat, lon: initialLon } = props;
  const [inputValue, setInputValue] = useState(
    initialLocation || DEFAULT_LOCATION,
  );
  const [q] = useDebounceValue(inputValue, 500);

  const [selectedCity, setSelectedCity] = useState<GeoLocation | null>(() => {
    if (initialLat && initialLon && initialLocation) {
      const [name, country] = initialLocation.split(', ');
      return {
        name,
        country,
        lat: parseFloat(initialLat),
        lon: parseFloat(initialLon),
      };
    }
    if (initialLocation) {
      return null;
    }
    return DEFAULT_GEOLOCATION;
  });
  // Get geo data based on search input
  const { data: geoData, isLoading: isGeoLoading } = useGetGeo(q);
  const geoParams = {
    lat: selectedCity?.lat,
    lon: selectedCity?.lon,
  };
  // Get weather data based on selected location
  const { data: currentWeather, isLoading: isCurrentLoading } =
    useGetCurrentWeather(geoParams);

  const { data: forecastData, isLoading: isForecastLoading } =
    useGetForecast5(geoParams);

  const handleSelectCity = (location: GeoLocation) => {
    setSelectedCity(location);
    SearchHistoryStorage.appendItem(location);
  };

  return (
    <div className="flex h-full w-full flex-col">
      <div className="mx-auto max-w-md p-4">
        <LocationSearch
          selectedCity={selectedCity}
          inputValue={inputValue}
          setInputValue={setInputValue}
          geoData={geoData}
          isGeoLoading={isGeoLoading}
          onSelectCity={handleSelectCity}
        />
      </div>
      <div className="inset-shadow-md flex-1 bg-gradient-to-b from-blue-100 to-blue-50">
        <div className="mx-auto max-w-100 space-y-2 p-4">
          <CurrentWeatherCard
            currentWeather={currentWeather}
            isLoading={isCurrentLoading}
          />
          <div className="">5-day Forecast (3 Hours)</div>
          <ForecastSection
            isLoading={isForecastLoading}
            forecastData={forecastData}
          />
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;
