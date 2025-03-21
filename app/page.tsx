'use client';
import WeatherInfo from '@/components/WeatherInfo/WeatherInfo';
import { useSearchParams } from 'next/navigation';

export default function Home() {
  const searchParams = useSearchParams();
  const location = searchParams.get('location') || '';
  const lat = searchParams.get('lat') || '';
  const lon = searchParams.get('lon') || '';

  return <WeatherInfo location={location} lat={lat} lon={lon} />;
}
