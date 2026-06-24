import type { HttpClient } from '../HttpClient';
import type { ApiSuccessResponse, LanguageType, LocationSearchParams } from '../types';

/** Utility API methods for account info, domains, languages, and locations. */
export class Extra {
  constructor(private readonly http: HttpClient) {}

  /**
   * Retrieve account information including active plan and credit usage.
   *
   * @returns Account details, plan info, and available credits.
   * @throws {@link SERPHouseError} When the API returns an error or the request fails.
   * @see https://docs.serphouse.com/extra-apis/account-info
   */
  account_info(): Promise<ApiSuccessResponse> {
    return this.http.get('/account/info');
  }

  /**
   * List all supported search engine domains.
   *
   * @returns Available domains for Google, Bing, and Yahoo.
   * @throws {@link SERPHouseError} When the API returns an error or the request fails.
   * @see https://docs.serphouse.com/extra-apis/domains-list
   */
  domain_list(): Promise<ApiSuccessResponse> {
    return this.http.get('/domain/list');
  }

  /**
   * List available language codes for a given search engine.
   *
   * @param type - Search engine type (`google`, `bing`, or `yahoo`).
   * @returns Language codes supported by the specified engine.
   * @throws {@link SERPHouseError} When the API returns an error or the request fails.
   * @see https://docs.serphouse.com/extra-apis/languages-list
   */
  language_list(type: LanguageType): Promise<ApiSuccessResponse> {
    return this.http.get(`/language/list/${type}`);
  }

  /**
   * Search for locations to use in `loc` or `loc_id` parameters.
   *
   * @param params - Location query and search engine type.
   * @returns Matching locations with their IDs.
   * @throws {@link SERPHouseError} When the API returns an error or the request fails.
   * @see https://docs.serphouse.com/extra-apis/locations-list
   */
  location_search(params: LocationSearchParams): Promise<ApiSuccessResponse> {
    return this.http.get('/location/search', {
      q: params.q,
      type: params.type,
    });
  }
}
