import WeatherInfo from '@/components/WeatherInfo/WeatherInfo';

export default function Home() {
  const searchParams = new URLSearchParams(window.location.search);
  const location = searchParams.get('location') || '';
  const lat = searchParams.get('lat') || '';
  const lon = searchParams.get('lon') || '';

  return <WeatherInfo location={location} lat={lat} lon={lon} />;
}
