import { apiService } from '@/services/api.service';
import { useQuery } from '@tanstack/react-query';

const useGetGeo = (q: string) => {
  return useQuery({
    queryKey: ['useGetGeo', q],
    queryFn: () => apiService.getGeo(q),
    placeholderData: previousData => previousData,
    enabled: !!q,
  });
};

export default useGetGeo;
