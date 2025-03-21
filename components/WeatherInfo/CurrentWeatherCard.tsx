import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';
import { IForecastItem } from '@/types/openWeatherMap';
import WindDirectionIcon from './WindDirectionIcon';
import { getWeatherIcon } from '@/utils/openWeatherMap';
import { Loader2 } from 'lucide-react';

interface CurrentWeatherCardProps {
  currentWeather: IForecastItem | undefined;
  isLoading: boolean;
}

const CurrentWeatherCard = ({
  currentWeather,
  isLoading,
}: CurrentWeatherCardProps) => {
  if (isLoading) {
    return (
      <Card className="min-h-50 rounded-lg bg-white shadow-md">
        <CardContent className="flex h-48 flex-col items-center justify-center p-4">
          <Loader2 className="mb-3 h-10 w-10 animate-spin text-gray-400" />
          <p className="text-gray-500">Loading forecast data...</p>
        </CardContent>
      </Card>
    );
  }
  if (!currentWeather) {
    return (
      <Card className="min-h-50 rounded-lg bg-white shadow-md">
        <CardContent className="flex h-48 flex-col items-center justify-center p-4">
          <img src={getWeatherIcon('04n')} className="h-16 w-16" />
          <p className="font-medium text-gray-500">No weather data</p>
          <p className="mt-1 text-center text-sm text-gray-400">
            Weather information is currently unavailable
          </p>
        </CardContent>
      </Card>
    );
  }
  const { main, weather, wind, visibility, dt } = currentWeather;
  const { temp, humidity } = main;
  const { speed, deg } = wind;
  const { description } = weather[0];
  const date = format(new Date(dt * 1000), 'MMMM, dd yyyy');
  const temperature = temp;
  const condition = description;
  const windSpeed = speed;
  return (
    <Card className="min-h-50 rounded-lg bg-white py-0 shadow-md">
      <CardContent className="p-4">
        <div className="mb-3 text-sm text-gray-600">{date}</div>

        <div className="mb-4 flex items-center">
          <div className="mr-4 flex w-1/2 items-center justify-center">
            {currentWeather?.weather?.[0]?.icon && (
              <img
                src={getWeatherIcon(currentWeather.weather[0].icon)}
                alt={currentWeather.weather[0].description}
                className="h-20 w-20"
              />
            )}
          </div>
          <div className="flex w-1/2 flex-col items-center justify-center">
            <div className="flex items-baseline">
              <span className="text-4xl font-bold">{temperature}°C</span>
            </div>
            <div className="text-gray-600">{condition}</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Humidity</span>
            <span className="font-medium">{humidity} %</span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Winds</span>
            <span className="flex items-center justify-center font-medium">
              <WindDirectionIcon
                deg={deg}
                className="mr-1 h-3 w-3 text-gray-600"
              />
              {windSpeed} m/s
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Visibility</span>
            <span className="font-medium">{visibility} km</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentWeatherCard;
