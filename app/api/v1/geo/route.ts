import { mockGeoData } from '@/lib/mock-data';
import { openWeatherMapService } from '@/services/openWeatherMap.service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    return NextResponse.json(mockGeoData);
    // Get query parameter from the URL
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get('q');
    if (!query) {
      return NextResponse.json({ error: 'q is required' }, { status: 400 });
    }
    // Await the API call to get the response
    const response = await openWeatherMapService.searchLocations(query);

    // Return the data with a 200 status code
    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error('Search locations error:', error);

    // Forward the original status code if available, otherwise use 500
    const statusCode = error.statusCode || error.status || 500;
    const message = error.message || 'An unexpected error occurred';

    return NextResponse.json({ error: message }, { status: statusCode });
  }
}
