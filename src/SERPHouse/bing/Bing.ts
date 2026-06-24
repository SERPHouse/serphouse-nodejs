import type { HttpClient } from '../HttpClient';
import type { ApiSuccessResponse, BingSearchParams, RequestOptions } from '../types';

/** Bing search engine API methods. */
export class Bing {
  constructor(private readonly http: HttpClient) {}

  /**
   * Access Bing web search results in real time.
   *
   * @param params - Search parameters.
   * @param options - Optional request options (e.g. response format).
   * @returns Parsed search results.
   * @throws {@link SERPHouseError} When the API returns an error or the request fails.
   * @see https://docs.serphouse.com/bing-apis/bing-search-api
   */
  search(params: BingSearchParams, options?: RequestOptions): Promise<ApiSuccessResponse> {
    return this.http.post('/bing-web', params, options);
  }

  /**
   * Retrieve Bing image search results.
   *
   * @param params - Search parameters.
   * @param options - Optional request options (e.g. response format).
   * @returns Parsed image search results.
   * @throws {@link SERPHouseError} When the API returns an error or the request fails.
   * @see https://docs.serphouse.com/bing-apis/bing-image-api
   */
  image(params: BingSearchParams, options?: RequestOptions): Promise<ApiSuccessResponse> {
    return this.http.post('/bing-image', params, options);
  }

  /**
   * Retrieve Bing news search results.
   *
   * @param params - Search parameters.
   * @param options - Optional request options (e.g. response format).
   * @returns Parsed news search results.
   * @throws {@link SERPHouseError} When the API returns an error or the request fails.
   * @see https://docs.serphouse.com/bing-apis/bing-news-api
   */
  news(params: BingSearchParams, options?: RequestOptions): Promise<ApiSuccessResponse> {
    return this.http.post('/bing-news', params, options);
  }
}
