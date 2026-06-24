import type { HttpClient } from '../HttpClient';
import type {
  ApiSuccessResponse,
  RequestOptions,
  YahooImageParams,
  YahooSearchParams,
} from '../types';

/** Yahoo search engine API methods. */
export class Yahoo {
  constructor(private readonly http: HttpClient) {}

  /**
   * Access Yahoo web search results in real time.
   *
   * @param params - Search parameters.
   * @param options - Optional request options (e.g. response format).
   * @returns Parsed search results.
   * @throws {@link SERPHouseError} When the API returns an error or the request fails.
   * @see https://docs.serphouse.com/yahoo-apis/yahoo-search-api
   */
  search(params: YahooSearchParams, options?: RequestOptions): Promise<ApiSuccessResponse> {
    return this.http.post('/yahoo-web', params, options);
  }

  /**
   * Retrieve Yahoo image search results.
   *
   * @param params - Search parameters.
   * @param options - Optional request options (e.g. response format).
   * @returns Parsed image search results.
   * @throws {@link SERPHouseError} When the API returns an error or the request fails.
   * @see https://docs.serphouse.com/yahoo-apis/yahoo-image-api
   */
  image(params: YahooImageParams, options?: RequestOptions): Promise<ApiSuccessResponse> {
    return this.http.post('/yahoo-image', params, options);
  }

  /**
   * Retrieve Yahoo news search results.
   *
   * @param params - Search parameters.
   * @param options - Optional request options (e.g. response format).
   * @returns Parsed news search results.
   * @throws {@link SERPHouseError} When the API returns an error or the request fails.
   * @see https://docs.serphouse.com/yahoo-apis/yahoo-news-api
   */
  news(params: YahooSearchParams, options?: RequestOptions): Promise<ApiSuccessResponse> {
    return this.http.post('/yahoo-news', params, options);
  }
}
