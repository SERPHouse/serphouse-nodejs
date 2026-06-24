import type { ApiErrorResponse } from "./types";

/**
 * Error thrown when a SERPHouse API request fails.
 *
 * @example
 * ```ts
 * try {
 *   await client.google.search({ q: 'test', domain: 'google.com', lang: 'en', device: 'desktop' });
 * } catch (error) {
 *   if (error instanceof SERPHouseError) {
 *     console.error(error.statusCode, error.apiMessage, error.apiError);
 *   }
 * }
 * ```
 */
export class SERPHouseError extends Error {
  /** HTTP status code returned by the API, if available. */
  readonly statusCode?: number;
  /** Human-readable error message from the API. */
  readonly apiMessage: string;
  /** Structured validation or error details from the API. */
  readonly apiError: ApiErrorResponse["error"];

  /**
   * @param message - Error message.
   * @param options - Additional error context from the API response.
   */
  constructor(
    message: string,
    options?: {
      statusCode?: number;
      apiMessage?: string;
      apiError?: ApiErrorResponse["error"];
    },
  ) {
    super(message);
    this.name = "SERPHouseError";
    this.statusCode = options?.statusCode;
    this.apiMessage = options?.apiMessage ?? message;
    this.apiError = options?.apiError ?? "";
  }
}
