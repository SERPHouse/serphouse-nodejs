import {
  createClient,
  describeWithApiKey,
  googleSearchParams,
  runApisInParallel,
} from './helpers';

describeWithApiKey('Google API', () => {
  it('all endpoints return success (parallel)', async () => {
    const client = createClient();

    await runApisInParallel([
      { name: 'search', run: () => client.google.search(googleSearchParams) },
      { name: 'image', run: () => client.google.image(googleSearchParams) },
      { name: 'video', run: () => client.google.video(googleSearchParams) },
      { name: 'short_video', run: () => client.google.short_video(googleSearchParams) },
      { name: 'news', run: () => client.google.news(googleSearchParams) },
      { name: 'shopping', run: () => client.google.shopping(googleSearchParams) },
      { name: 'local', run: () => client.google.local(googleSearchParams) },
      { name: 'jobs', run: () => client.google.jobs(googleSearchParams) },
      { name: 'forums', run: () => client.google.forums(googleSearchParams) },
      {
        name: 'autocomplete',
        run: () =>
          client.google.autocomplete({
            ...googleSearchParams,
            q: 'coff',
          }),
      },
    ]);
  });
});
