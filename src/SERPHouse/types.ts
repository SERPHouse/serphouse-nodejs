/** Device type for search result extraction. */
export type Device = "desktop" | "mobile";

/**
 * Time filter for search results.
 * - `h` — past hour
 * - `d` — past 24 hours
 * - `w` — past week
 * - `m` — past month
 * - `y` — past year
 * - `YYYY-MM-DD,YYYY-MM-DD` — custom date range
 */
export type DateRange = "h" | "d" | "w" | "m" | "y" | `${string},${string}`;

/**
 * Enterprise-only NoTrace mode. When enabled (`1` or `true`), search parameters,
 * files, and metadata are not stored on SERPHouse servers.
 */
export type NoTrace = boolean | 0 | 1 | "0" | "1" | "true" | "false";

/** Response format appended to POST endpoint paths (e.g. `/google-web/json`). */
export type ResponseType = "json" | "html";

/** Common search parameters shared across engines. */
export interface BaseSearchParams {
  /** Search phrase or query string. */
  q: string;
  /** Page number to retrieve. Defaults to `1`. */
  page?: number;
  /** Enterprise-only. Disable storage of search data on SERPHouse servers. */
  no_trace?: NoTrace;
}

/** Parameters for Google search endpoints. */
export interface GoogleSearchParams extends BaseSearchParams {
  /** Google domain (e.g. `google.com`). Use {@link Extra.domain_list} to list supported domains. */
  domain: string;
  /** Language code (e.g. `en`, `fr`). Use {@link Extra.language_list} with type `google`. */
  lang: string;
  /** Device type for result extraction. */
  device: Device;
  /** Location string (e.g. `New York,United States`). Use {@link Extra.location_search} to find valid values. */
  loc?: string;
  /** Location ID. Alternative to `loc` — specify one of `loc` or `loc_id`. */
  loc_id?: number;
  /** Filter results by time period. */
  date_range?: DateRange;
}

/** Parameters for Bing search endpoints. */
export interface BingSearchParams extends BaseSearchParams {
  /** Language code (e.g. `en`). Use {@link Extra.language_list} with type `bing`. */
  lang: string;
  /** Device type for result extraction. */
  device: Device;
  /** Location string. Use {@link Extra.location_search} to find valid values. */
  loc?: string;
  /** Location ID. Alternative to `loc` — specify one of `loc` or `loc_id`. */
  loc_id?: number;
  /** Filter results by time period. */
  date_range?: DateRange;
}

/** Parameters for Yahoo web and news search endpoints. */
export interface YahooSearchParams extends BaseSearchParams {
  /** Yahoo domain (e.g. `search.yahoo.com`). Use {@link Extra.domain_list} to list supported domains. */
  domain: string;
  /** Language code (e.g. `en`). Use {@link Extra.language_list} with type `yahoo`. */
  lang: string;
  /** Device type for result extraction. */
  device: Device;
}

/** Parameters for Yahoo image search endpoint. */
export interface YahooImageParams extends BaseSearchParams {
  /** Yahoo domain (e.g. `search.yahoo.com`). */
  domain: string;
  /** Language code (e.g. `en`). */
  lang: string;
}

/** Options for initializing the {@link SERPHouse} client. */
export interface ClientOptions {
  /** Your SERPHouse API key. */
  apiKey: string;
  /** API base URL. Defaults to `https://api.serphouse.com`. */
  baseUrl?: string;
  /** Request timeout in milliseconds. Defaults to `60000`. */
  timeout?: number;
}

/** Per-request options for POST endpoints. */
export interface RequestOptions {
  /** Response format. Appended to the endpoint path (e.g. `/json` or `/html`). */
  responseType?: ResponseType;
}

/** Successful API response wrapper. */
export interface ApiSuccessResponse<T = unknown> {
  status: "success";
  msg: string;
  results: T;
}

/** Error API response wrapper. */
export interface ApiErrorResponse {
  status: "error";
  msg: string;
  error: string | Record<string, string[]>;
}

/** Union of success and error API responses. */
export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

/** Search engine type for the language list endpoint. */
export type LanguageType = "google" | "bing" | "yahoo";

/** Search engine type for the location search endpoint. */
export type LocationType = "google" | "bing";

/** Parameters for the location search endpoint. */
export interface LocationSearchParams {
  /** Location query string to search for. */
  q: string;
  /** Search engine whose locations to query. */
  type: LocationType;
}
