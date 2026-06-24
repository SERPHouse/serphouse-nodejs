import { Bing } from "./bing";
import { Extra } from "./extra";
import { Google } from "./google";
import { HttpClient } from "./HttpClient";
import type { ClientOptions } from "./types";
import { Yahoo } from "./yahoo";

/**
 * SERPHouse API client for Google, Bing, and Yahoo search engines.
 *
 * Access APIs via namespaced resources (`client.google.search`) or flat aliases
 * (`client.google_search`). Both styles call the same underlying methods.
 *
 * @example
 * ```ts
 * import { SERPHouse } from '@serphouse/serphouse-nodejs';
 *
 * const client = new SERPHouse('YOUR_API_KEY');
 *
 * const results = await client.google.search({
 *   q: 'Fresh Bagels',
 *   domain: 'google.com',
 *   lang: 'en',
 *   device: 'desktop',
 *   loc: 'New York,United States',
 * });
 *
 * console.log(results.results);
 * ```
 */
export class SERPHouse {
  /** Google search engine API methods. */
  readonly google: Google;
  /** Bing search engine API methods. */
  readonly bing: Bing;
  /** Yahoo search engine API methods. */
  readonly yahoo: Yahoo;
  /** Utility API methods (account, domains, languages, locations). */
  readonly extra: Extra;

  /**
   * Google web search. Alias for {@link Google.search}.
   * @param params - Search parameters.
   * @param options - Optional request options.
   */
  google_search: Google["search"];
  /**
   * Google image search. Alias for {@link Google.image}.
   * @param params - Search parameters.
   * @param options - Optional request options.
   */
  google_image: Google["image"];
  /**
   * Google video search. Alias for {@link Google.video}.
   * @param params - Search parameters.
   * @param options - Optional request options.
   */
  google_video: Google["video"];
  /**
   * Google short-form video search (Shorts, TikTok, Reels). Alias for {@link Google.short_video}.
   * @param params - Search parameters.
   * @param options - Optional request options.
   */
  google_short_video: Google["short_video"];
  /**
   * Google news search. Alias for {@link Google.news}.
   * @param params - Search parameters.
   * @param options - Optional request options.
   */
  google_news: Google["news"];
  /**
   * Google shopping search. Alias for {@link Google.shopping}.
   * @param params - Search parameters.
   * @param options - Optional request options.
   */
  google_shopping: Google["shopping"];
  /**
   * Google local business search. Alias for {@link Google.local}.
   * @param params - Search parameters.
   * @param options - Optional request options.
   */
  google_local: Google["local"];
  /**
   * Google jobs search. Alias for {@link Google.jobs}.
   * @param params - Search parameters.
   * @param options - Optional request options.
   */
  google_jobs: Google["jobs"];
  /**
   * Google forums search (Reddit, Quora, etc.). Alias for {@link Google.forums}.
   * @param params - Search parameters.
   * @param options - Optional request options.
   */
  google_forums: Google["forums"];
  /**
   * Google autocomplete suggestions (5 credits/request). Alias for {@link Google.autocomplete}.
   * @param params - Search parameters.
   * @param options - Optional request options.
   */
  google_autocomplete: Google["autocomplete"];

  /**
   * Bing web search. Alias for {@link Bing.search}.
   * @param params - Search parameters.
   * @param options - Optional request options.
   */
  bing_search: Bing["search"];
  /**
   * Bing image search. Alias for {@link Bing.image}.
   * @param params - Search parameters.
   * @param options - Optional request options.
   */
  bing_image: Bing["image"];
  /**
   * Bing news search. Alias for {@link Bing.news}.
   * @param params - Search parameters.
   * @param options - Optional request options.
   */
  bing_news: Bing["news"];

  /**
   * Yahoo web search. Alias for {@link Yahoo.search}.
   * @param params - Search parameters.
   * @param options - Optional request options.
   */
  yahoo_search: Yahoo["search"];
  /**
   * Yahoo image search. Alias for {@link Yahoo.image}.
   * @param params - Search parameters.
   * @param options - Optional request options.
   */
  yahoo_image: Yahoo["image"];
  /**
   * Yahoo news search. Alias for {@link Yahoo.news}.
   * @param params - Search parameters.
   * @param options - Optional request options.
   */
  yahoo_news: Yahoo["news"];

  /**
   * Retrieve account info and credit usage. Alias for {@link Extra.account_info}.
   */
  account_info: Extra["account_info"];
  /**
   * List supported search engine domains. Alias for {@link Extra.domain_list}.
   */
  domain_list: Extra["domain_list"];
  /**
   * List language codes for a search engine. Alias for {@link Extra.language_list}.
   * @param type - Search engine type (`google`, `bing`, or `yahoo`).
   */
  language_list: Extra["language_list"];
  /**
   * Search locations for targeting. Alias for {@link Extra.location_search}.
   * @param params - Location query and search engine type.
   */
  location_search: Extra["location_search"];

  /**
   * Create a new SERPHouse API client.
   *
   * @param apiKey - Your SERPHouse API key.
   * @param options - Optional client configuration (base URL, timeout).
   */
  constructor(apiKey: string, options?: Omit<ClientOptions, "apiKey">) {
    const http = new HttpClient({ apiKey, ...options });

    this.google = new Google(http);
    this.bing = new Bing(http);
    this.yahoo = new Yahoo(http);
    this.extra = new Extra(http);

    this.google_search = this.google.search.bind(this.google);
    this.google_image = this.google.image.bind(this.google);
    this.google_video = this.google.video.bind(this.google);
    this.google_short_video = this.google.short_video.bind(this.google);
    this.google_news = this.google.news.bind(this.google);
    this.google_shopping = this.google.shopping.bind(this.google);
    this.google_local = this.google.local.bind(this.google);
    this.google_jobs = this.google.jobs.bind(this.google);
    this.google_forums = this.google.forums.bind(this.google);
    this.google_autocomplete = this.google.autocomplete.bind(this.google);

    this.bing_search = this.bing.search.bind(this.bing);
    this.bing_image = this.bing.image.bind(this.bing);
    this.bing_news = this.bing.news.bind(this.bing);

    this.yahoo_search = this.yahoo.search.bind(this.yahoo);
    this.yahoo_image = this.yahoo.image.bind(this.yahoo);
    this.yahoo_news = this.yahoo.news.bind(this.yahoo);

    this.account_info = this.extra.account_info.bind(this.extra);
    this.domain_list = this.extra.domain_list.bind(this.extra);
    this.language_list = this.extra.language_list.bind(this.extra);
    this.location_search = this.extra.location_search.bind(this.extra);
  }
}
