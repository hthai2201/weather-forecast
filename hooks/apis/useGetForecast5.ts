import { apiService } from '@/services/api.service';
import { GeoParams } from '@/types/params';
import { useQuery } from '@tanstack/react-query';

const useGetForecast5 = (query: Partial<GeoParams>) => {
  return useQuery({
    queryKey: ['useGetForecast5', query],
    queryFn: () => apiService.getForecast5(query as GeoParams),
    placeholderData: previousData => previousData,
    enabled: !!query?.lat && !!query?.lon,
  });
};

export default useGetForecast5;
