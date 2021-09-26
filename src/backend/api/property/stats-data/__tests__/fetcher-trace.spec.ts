import { mockWindowFetch } from 'mocks/window/fetch.mock';
import { propertiesRawBackendStub } from 'stubs/properties/raw-backend.stub';

import { AnyValueType } from 'types/any/value.type';

describe('backendApiPropertyStatsDataFetcher', () => {
  it('should map data correctly and obfuscate the keys', async () => {
    // eslint-disable-next-line no-console
    console.log = jest.fn();
    process.env.TRACE = '1';

    mockWindowFetch({ json: () => Promise.resolve(propertiesRawBackendStub()) });
    const result = await (
      await import('../fetcher')
    ).backendApiPropertyStatsDataFetcher({
      locale: 'en',
      propertiesIds: ['1', '2'],
      pageNumber: 30,
    });

    expect(result.ok).toBeTruthy();
    if (result.ok) {
      expect((result.data as Record<string, AnyValueType>).__full).toBeTruthy();
    }
  });
});
