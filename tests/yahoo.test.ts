import {
  createClient,
  describeWithApiKey,
  runApisInParallel,
  yahooImageParams,
  yahooSearchParams,
} from './helpers';

describeWithApiKey('Yahoo API', () => {
  it('all endpoints return success (parallel)', async () => {
    const client = createClient();

    await runApisInParallel([
      { name: 'search', run: () => client.yahoo.search(yahooSearchParams) },
      { name: 'image', run: () => client.yahoo.image(yahooImageParams) },
      { name: 'news', run: () => client.yahoo.news(yahooSearchParams) },
    ]);
  });
});
