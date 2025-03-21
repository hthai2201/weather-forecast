import { apiService } from '@/services/api.service';
import { GeoParams } from '@/types/params';
import { useQuery } from '@tanstack/react-query';

const useGetCurrentWeather = (query: Partial<GeoParams>) => {
  return useQuery({
    queryKey: ['useGetCurrentWeather', query],
    queryFn: () => apiService.getCurrentWeather(query as GeoParams),
    placeholderData: previousData => previousData,
    enabled: !!query?.lat && !!query?.lon,
  });
};

export default useGetCurrentWeather;
