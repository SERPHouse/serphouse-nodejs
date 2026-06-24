import {
  bingSearchParams,
  createClient,
  describeWithApiKey,
  runApisInParallel,
} from './helpers';

describeWithApiKey('Bing API', () => {
  it('all endpoints return success (parallel)', async () => {
    const client = createClient();

    await runApisInParallel([
      { name: 'search', run: () => client.bing.search(bingSearchParams) },
      { name: 'image', run: () => client.bing.image(bingSearchParams) },
      { name: 'news', run: () => client.bing.news(bingSearchParams) },
    ]);
  });
});
