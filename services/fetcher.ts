import ApiEvents from './api.events';

export class FetcherError extends Error {
  public statusCode: number;
  public res: Response;
  public body?: any;

  constructor(message: string, statusCode: number, origResponse: Response) {
    super(message);
    this.name = 'HttpError';
    this.statusCode = statusCode;
    this.res = origResponse;
  }
}

export default async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  try {
    const res = await fetch(input, init);
    if (res.ok) {
      return await (res.json() as Promise<JSON>);
    }

    ApiEvents.emit('API_REQUEST', res);

    const error = new FetcherError(res.statusText, res.status, res);

    const isResponseJson = res.headers
      .get('content-type')
      ?.includes('application/json');

    if (isResponseJson) {
      let data;

      try {
        data = (await res.json()) as any;
        error.body = data;
        error.message = data?.err || data?.error;
      } catch (err: any) {
        error.message = err.message;
      }
    }

    return await Promise.reject(error);
  } catch (error: any) {
    return await Promise.reject(error);
  }
}
