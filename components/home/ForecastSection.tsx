import React, { useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, AlertCircle } from 'lucide-react';
import { Forecast5Response } from '@/types/openWeatherMap';
import { groupBy } from 'lodash';
import { getWeatherIcon } from '@/utils/openWeatherMap';
import { formatDate, isToday } from 'date-fns';

interface ForecastTimelineProps {
  forecastData?: Forecast5Response;
  isLoading?: boolean;
  error?: boolean;
}

const ForecastTimeline: React.FC<ForecastTimelineProps> = ({
  forecastData,
  isLoading = false,
  error = false,
}) => {
  // Group forecast by day
  const groupedForecast = useMemo(() => {
    const grouped = groupBy(forecastData?.list, item => {
      const date = new Date(item?.dt * 1000);
      const today = isToday(date);
      return today ? 'Today' : formatDate(date, 'dd MMMM');
    });
    return grouped;
  }, [forecastData]);

  // Loading state
  if (isLoading) {
    return (
      <Card className="w-full max-w-100 rounded-lg bg-white shadow-md">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Loader2 className="mb-3 h-10 w-10 animate-spin text-gray-400" />
          <p className="text-gray-500">Loading forecast data...</p>
        </CardContent>
      </Card>
    );
  }

  // Error/Not found state
  if (error || !forecastData?.list?.length) {
    return (
      <Card className="w-full max-w-100 rounded-lg bg-white shadow-md">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="mb-3 h-10 w-10 text-gray-400" />
          <p className="font-medium text-gray-500">
            Forecast data not available
          </p>
          <p className="mt-1 text-center text-sm text-gray-400">
            Unable to retrieve weather forecast information
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-100 rounded-lg bg-white py-0 shadow-md">
      <CardContent className="space-y-2 p-4">
        {Object.entries(groupedForecast).map(([date, items]) => (
          <div key={date}>
            <h3 className="mb-2 text-sm font-medium text-gray-700">{date}</h3>

            <div className="space-y-3 space-x-1">
              {items.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="w-12 text-sm text-gray-700">
                    {formatDate(item.dt * 1000, 'hh:mm')}
                  </div>

                  <div className="flex items-center gap-2">
                    <img
                      src={getWeatherIcon(item.weather?.[0].icon)}
                      className="h-8 w-8"
                    />
                    <div className="w-32 text-sm text-gray-500">
                      {item.main.temp_max.toFixed(2)} /{' '}
                      {item.main.temp_min.toFixed(2)}°C
                    </div>
                  </div>

                  <div className="flex-1 text-right text-sm text-gray-700">
                    {item.weather?.[0]?.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ForecastTimeline;
