import { SERPHouse, type ApiSuccessResponse } from '../src/SERPHouse';

export const apiKey = process.env.API_KEY;

export const describeWithApiKey = apiKey ? describe : describe.skip;

export function createClient(): SERPHouse {
  if (!apiKey) {
    throw new Error('API_KEY is required. Add it to your .env file.');
  }

  return new SERPHouse(apiKey);
}

export function expectSuccess(response: ApiSuccessResponse): void {
  expect(response.status).toBe('success');
  expect(response.results).toBeDefined();
}

export type ApiTestCase = {
  name: string;
  run: () => Promise<ApiSuccessResponse>;
  assert?: (response: ApiSuccessResponse) => void;
};

/** Run multiple API calls in parallel and report all failures together. */
export async function runApisInParallel(cases: ApiTestCase[]): Promise<void> {
  const results = await Promise.allSettled(
    cases.map(async ({ name, run, assert }) => {
      const response = await run();
      expectSuccess(response);
      assert?.(response);
      return name;
    }),
  );

  const failures = results
    .map((result, index) => ({ result, name: cases[index].name }))
    .filter(({ result }) => result.status === 'rejected');

  if (failures.length > 0) {
    const details = failures
      .map(({ name, result }) => {
        const reason = (result as PromiseRejectedResult).reason;
        const message = reason instanceof Error ? reason.message : String(reason);
        return `  - ${name}: ${message}`;
      })
      .join('\n');

    throw new Error(`${failures.length} API call(s) failed:\n${details}`);
  }
}

export const googleSearchParams = {
  q: 'coffee',
  domain: 'google.com',
  lang: 'en',
  device: 'desktop' as const,
  loc: 'New York,United States',
  page: 1,
};

export const bingSearchParams = {
  q: 'coffee',
  lang: 'en-US',
  device: 'desktop' as const,
  loc: 'United States',
  page: 1,
};

export const yahooSearchParams = {
  q: 'coffee',
  domain: 'uk.yahoo.com',
  lang: 'lang_en',
  device: 'desktop' as const,
  page: 1,
};

export const yahooImageParams = {
  q: 'coffee',
  domain: 'uk.yahoo.com',
  lang: 'lang_en',
  page: 1,
};
