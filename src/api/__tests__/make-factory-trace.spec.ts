/* eslint pf-rules/export-name-validation: 0 */

import { mockConsole } from 'mocks/mock/console';
import { mockFetch } from 'mocks/mock/fetch';

describe('ApiFactory', () => {
  const origin = 'origin';
  const url = 'url';

  it('should print to console if configIsTrace is true', async () => {
    process.env.TRACE = '1';
    mockFetch();

    const apiFactory = (await import('api/make-factory')).ApiMakeFactory({
      getOrigin: () => origin,
      requireAuth: false,
    });

    const fetcher = apiFactory({ method: 'GET', url });
    const consoleMock = mockConsole();
    await fetcher({ locale: 'en' });

    expect(consoleMock.log).toHaveBeenCalledTimes(1);
    expect(consoleMock.log).toHaveBeenCalledWith('fetch', 'origin/en/api/url', {
      headers: { locale: 'en' },
      method: 'GET',
    });
  });
});

export {};
