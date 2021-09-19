import { mockReactUseSwr } from 'mocks/react/use-swr.mock';

import { useOnBoardingStorage } from 'helpers/on-boarding/storage.hook';

const localStorageKey = 'en_on-boarding';
const data = {
  'save-search-tooltip': true,
  'filter-tooltip': true,
};

describe('useOnBoardingStorage()', () => {
  it('should return data and mutate', () => {
    mockReactUseSwr('api_user', { ok: true, data });

    expect(useOnBoardingStorage(localStorageKey)).toEqual(
      expect.objectContaining({
        hasBeenClosedMap: { ok: true, data },
      })
    );
  });
});
