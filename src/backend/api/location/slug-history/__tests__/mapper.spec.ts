import { locationSlugHistoryBackendStub } from 'stubs/location/slug-history-backend.stub';

import { backendApiLocationSlugHistoryMapper } from '../mapper';

describe('backendApiLocationSlugHistoryMapper', () => {
  it('should map all the required fields', () => {
    expect(
      backendApiLocationSlugHistoryMapper([
        locationSlugHistoryBackendStub({ id: '1' }),
        locationSlugHistoryBackendStub({ id: '2' }),
      ])
    ).toMatchInlineSnapshot(`
      Array [
        Object {
          "id": "1",
          "newSlug": "new-slug",
          "originalSlug": "old-location-slug",
        },
        Object {
          "id": "2",
          "newSlug": "new-slug",
          "originalSlug": "old-location-slug",
        },
      ]
    `);
  });
});
