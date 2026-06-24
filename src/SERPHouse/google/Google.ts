import type { HttpClient } from '../HttpClient';
import type { ApiSuccessResponse, GoogleSearchParams, RequestOptions } from '../types';

/** Google search engine API methods. */
export class Google {
  constructor(private readonly http: HttpClient) {}

  /**
   * Access Google's web search results in real time.
   *
   * @param params - Search parameters.
   * @param options - Optional request options (e.g. response format).
   * @returns Parsed search results.
   * @throws {@link SERPHouseError} When the API returns an error or the request fails.
   * @see https://docs.serphouse.com/google-apis/google-search-api
   */
  search(params: GoogleSearchParams, options?: RequestOptions): Promise<ApiSuccessResponse> {
    return this.http.post('/google-web', params, options);
  }

  /**
   * Retrieve Google image search results.
   *
   * @param params - Search parameters.
   * @param options - Optional request options (e.g. response format).
   * @returns Parsed image search results.
   * @throws {@link SERPHouseError} When the API returns an error or the request fails.
   * @see https://docs.serphouse.com/google-apis/google-image-api
   */
  image(params: GoogleSearchParams, options?: RequestOptions): Promise<ApiSuccessResponse> {
    return this.http.post('/google-image', params, options);
  }

  /**
   * Retrieve Google video search results.
   *
   * @param params - Search parameters.
   * @param options - Optional request options (e.g. response format).
   * @returns Parsed video search results.
   * @throws {@link SERPHouseError} When the API returns an error or the request fails.
   * @see https://docs.serphouse.com/google-apis/google-videos-api
   */
  video(params: GoogleSearchParams, options?: RequestOptions): Promise<ApiSuccessResponse> {
    return this.http.post('/google-videos-api', params, options);
  }

  /**
   * Retrieve short-form video results (YouTube Shorts, TikTok, Reels, etc.).
   *
   * @param params - Search parameters.
   * @param options - Optional request options (e.g. response format).
   * @returns Parsed short video search results.
   * @throws {@link SERPHouseError} When the API returns an error or the request fails.
   * @see https://docs.serphouse.com/google-apis/google-short-videos-api
   */
  short_video(params: GoogleSearchParams, options?: RequestOptions): Promise<ApiSuccessResponse> {
    return this.http.post('/google-short-videos-api', params, options);
  }

  /**
   * Retrieve Google news search results.
   *
   * @param params - Search parameters.
   * @param options - Optional request options (e.g. response format).
   * @returns Parsed news search results.
   * @throws {@link SERPHouseError} When the API returns an error or the request fails.
   * @see https://docs.serphouse.com/google-apis/google-news-api
   */
  news(params: GoogleSearchParams, options?: RequestOptions): Promise<ApiSuccessResponse> {
    return this.http.post('/google-news', params, options);
  }

  /**
   * Retrieve Google shopping and product search results.
   *
   * @param params - Search parameters.
   * @param options - Optional request options (e.g. response format).
   * @returns Parsed shopping search results.
   * @throws {@link SERPHouseError} When the API returns an error or the request fails.
   * @see https://docs.serphouse.com/google-apis/google-shopping-api
   */
  shopping(params: GoogleSearchParams, options?: RequestOptions): Promise<ApiSuccessResponse> {
    return this.http.post('/google-shop', params, options);
  }

  /**
   * Retrieve local business listings with GPS coordinates, ratings, and reviews.
   *
   * @param params - Search parameters.
   * @param options - Optional request options (e.g. response format).
   * @returns Parsed local search results.
   * @throws {@link SERPHouseError} When the API returns an error or the request fails.
   * @see https://docs.serphouse.com/google-apis/google-local-api
   */
  local(params: GoogleSearchParams, options?: RequestOptions): Promise<ApiSuccessResponse> {
    return this.http.post('/google-local-api', params, options);
  }

  /**
   * Retrieve Google job listings.
   *
   * @param params - Search parameters.
   * @param options - Optional request options (e.g. response format).
   * @returns Parsed job search results.
   * @throws {@link SERPHouseError} When the API returns an error or the request fails.
   * @see https://docs.serphouse.com/google-apis/google-jobs-api
   */
  jobs(params: GoogleSearchParams, options?: RequestOptions): Promise<ApiSuccessResponse> {
    return this.http.post('/google-jobs-api', params, options);
  }

  /**
   * Retrieve forum and discussion results (Reddit, Quora, etc.).
   *
   * @param params - Search parameters.
   * @param options - Optional request options (e.g. response format).
   * @returns Parsed forum search results.
   * @throws {@link SERPHouseError} When the API returns an error or the request fails.
   * @see https://docs.serphouse.com/google-apis/google-forums-api
   */
  forums(params: GoogleSearchParams, options?: RequestOptions): Promise<ApiSuccessResponse> {
    return this.http.post('/google-forums-api', params, options);
  }

  /**
   * Retrieve Google autocomplete and search suggestions. Costs 5 credits per request.
   *
   * @param params - Search parameters.
   * @param options - Optional request options (e.g. response format).
   * @returns Parsed autocomplete suggestions.
   * @throws {@link SERPHouseError} When the API returns an error or the request fails.
   * @see https://docs.serphouse.com/google-apis/google-autocomplete-api
   */
  autocomplete(params: GoogleSearchParams, options?: RequestOptions): Promise<ApiSuccessResponse> {
    return this.http.post('/google-autocomplete-api', params, options);
  }
}
