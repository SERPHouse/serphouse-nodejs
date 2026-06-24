import {
  createClient,
  describeWithApiKey,
  runApisInParallel,
} from './helpers';

describeWithApiKey('Extra API', () => {
  it('all endpoints return success (parallel)', async () => {
    const client = createClient();

    await runApisInParallel([
      { name: 'account_info', run: () => client.extra.account_info() },
      {
        name: 'domain_list',
        run: () => client.extra.domain_list(),
        assert: (response) => {
          expect(Array.isArray(response.results)).toBe(true);
        },
      },
      { name: 'language_list (google)', run: () => client.extra.language_list('google') },
      { name: 'language_list (bing)', run: () => client.extra.language_list('bing') },
      { name: 'language_list (yahoo)', run: () => client.extra.language_list('yahoo') },
      {
        name: 'location_search',
        run: () =>
          client.extra.location_search({
            q: 'New York',
            type: 'google',
          }),
        assert: (response) => {
          expect(Array.isArray(response.results)).toBe(true);
        },
      },
    ]);
  });
});
