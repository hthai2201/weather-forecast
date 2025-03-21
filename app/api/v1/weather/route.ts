import { openWeatherMapService } from '@/services/openWeatherMap.service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // Get query parameter from the URL

    const lat = req.nextUrl.searchParams.get('lat') || '';
    const lon = req.nextUrl.searchParams.get('lon') || '';
    if (!lat || !lon) {
      return NextResponse.json(
        { error: 'lat and lon are required' },
        { status: 400 },
      );
    }
    // Await the API call to get the response
    const response = await openWeatherMapService.getCurrentWeather(lat, lon);

    // Return the data with a 200 status code
    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error('Get weather error:', error);

    // Forward the original status code if available, otherwise use 500
    const statusCode = error.statusCode || error.status || 500;
    const message = error.message || 'An unexpected error occurred';

    return NextResponse.json({ error: message }, { status: statusCode });
  }
}
