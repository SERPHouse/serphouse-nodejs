import { SERPHouse, SERPHouseError } from '../src/SERPHouse';
import {
  bingSearchParams,
  createClient,
  describeWithApiKey,
  googleSearchParams,
  runApisInParallel,
  yahooSearchParams,
} from './helpers';

describe('SERPHouse client', () => {
  it('throws SERPHouseError when API key is missing', () => {
    expect(() => new SERPHouse('')).toThrow(SERPHouseError);
  });
});

describeWithApiKey('SERPHouse flat aliases', () => {
  it('all aliases return success (parallel)', async () => {
    const client = createClient();

    await runApisInParallel([
      { name: 'google_search', run: () => client.google_search(googleSearchParams) },
      { name: 'bing_search', run: () => client.bing_search(bingSearchParams) },
      { name: 'yahoo_search', run: () => client.yahoo_search(yahooSearchParams) },
      { name: 'account_info', run: () => client.account_info() },
      { name: 'domain_list', run: () => client.domain_list() },
      { name: 'language_list', run: () => client.language_list('google') },
      {
        name: 'location_search',
        run: () =>
          client.location_search({
            q: 'London',
            type: 'bing',
          }),
      },
    ]);
  });
});
