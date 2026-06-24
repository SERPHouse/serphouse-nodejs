import { SERPHouseError } from './Error';
import type { ApiResponse, ApiSuccessResponse, ClientOptions, RequestOptions } from './types';

const DEFAULT_BASE_URL = 'https://api.serphouse.com';
const DEFAULT_TIMEOUT = 60_000;

export class HttpClient {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly timeout: number;

  constructor(options: ClientOptions) {
    if (!options.apiKey) {
      throw new SERPHouseError('API key is required');
    }

    this.apiKey = options.apiKey;
    this.baseUrl = (options.baseUrl ?? DEFAULT_BASE_URL).replace(/\/$/, '');
    this.timeout = options.timeout ?? DEFAULT_TIMEOUT;
  }

  async get<T = unknown>(
    path: string,
    query?: Record<string, string>,
  ): Promise<ApiSuccessResponse<T>> {
    const url = new URL(`${this.baseUrl}${path}`);

    if (query) {
      for (const [key, value] of Object.entries(query)) {
        url.searchParams.set(key, value);
      }
    }

    return this.request<T>('GET', url.toString());
  }

  async post<T = unknown, P extends object = object>(
    path: string,
    data: P,
    requestOptions?: RequestOptions,
  ): Promise<ApiSuccessResponse<T>> {
    const suffix = requestOptions?.responseType ? `/${requestOptions.responseType}` : '';
    const url = `${this.baseUrl}${path}${suffix}`;

    return this.request<T>('POST', url, { data });
  }

  private async request<T>(
    method: 'GET' | 'POST',
    url: string,
    body?: { data: object },
  ): Promise<ApiSuccessResponse<T>> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          ...(body ? { 'Content-Type': 'application/json' } : {}),
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      const text = await response.text();
      let payload: ApiResponse<T>;

      try {
        payload = text ? (JSON.parse(text) as ApiResponse<T>) : ({} as ApiResponse<T>);
      } catch {
        throw new SERPHouseError('Invalid JSON response from SERPHouse API', {
          statusCode: response.status,
        });
      }

      if (!response.ok) {
        throw new SERPHouseError(
          payload.status === 'error' ? payload.msg : `HTTP ${response.status}`,
          {
            statusCode: response.status,
            apiMessage: payload.status === 'error' ? payload.msg : undefined,
            apiError: payload.status === 'error' ? payload.error : undefined,
          },
        );
      }

      if (payload.status === 'error') {
        throw new SERPHouseError(payload.msg, {
          statusCode: response.status,
          apiMessage: payload.msg,
          apiError: payload.error,
        });
      }

      return payload as ApiSuccessResponse<T>;
    } catch (error) {
      if (error instanceof SERPHouseError) {
        throw error;
      }

      if (error instanceof Error && error.name === 'AbortError') {
        throw new SERPHouseError(`Request timed out after ${this.timeout}ms`);
      }

      throw new SERPHouseError(error instanceof Error ? error.message : 'Unknown request error');
    } finally {
      clearTimeout(timeoutId);
    }
  }
}
