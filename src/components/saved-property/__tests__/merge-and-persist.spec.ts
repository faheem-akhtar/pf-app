import * as apiSavedPropertiesCreateFetcherModule from 'api/saved-properties/create-fetcher';
import { WindowService } from 'services/window/service';

import { savedPropertyMergeAndPersist } from '../merge-and-persist';

jest.mock('services/window/service');
jest.mock('api/saved-properties/create-fetcher');

describe('savedPropertyMergeAndPersist', () => {
  beforeEach(() => {
    (WindowService.localStorage.getItem as jest.Mock).mockClear();
    (WindowService.localStorage.setItem as jest.Mock).mockClear();

    (apiSavedPropertiesCreateFetcherModule.apiSavedPropertiesCreateFetcher as jest.Mock).mockClear();
  });

  it('should save to the local storage and to the server', () => {
    (WindowService.localStorage.getItem as jest.Mock).mockReturnValue([
      {
        property_id: 2,
        save_date: '2021-09-14',
      },
    ]);

    expect(
      savedPropertyMergeAndPersist([
        {
          id: '1',
          propertyId: 1,
          saveDate: '2021-09-14',
        },
      ])
    ).toEqual([
      {
        id: '1',
        propertyId: 1,
        saveDate: '2021-09-14',
      },
      {
        propertyId: 2,
        saveDate: '2021-09-14',
      },
    ]);
    expect(WindowService.localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(WindowService.localStorage.setItem).toHaveBeenCalledWith('saved-properties', [
      {
        property_id: 1,
        save_date: '2021-09-14',
      },
      {
        property_id: 2,
        save_date: '2021-09-14',
      },
    ]);

    expect(apiSavedPropertiesCreateFetcherModule.apiSavedPropertiesCreateFetcher).toHaveBeenCalledTimes(1);
    expect(apiSavedPropertiesCreateFetcherModule.apiSavedPropertiesCreateFetcher).toHaveBeenCalledWith(
      {
        propertyId: 2,
        saveDate: '2021-09-14',
      },
      expect.anything(),
      expect.anything()
    );
  });

  it('should not save to local storage nor to the server if it already exists', () => {
    (WindowService.localStorage.getItem as jest.Mock).mockReturnValue([
      {
        property_id: 2,
        save_date: '2021-09-14',
      },
    ]);

    expect(
      savedPropertyMergeAndPersist([
        {
          id: '1',
          propertyId: 2,
          saveDate: '2021-09-14',
        },
      ])
    ).toEqual([
      {
        id: '1',
        propertyId: 2,
        saveDate: '2021-09-14',
      },
    ]);

    expect(WindowService.localStorage.setItem).not.toHaveBeenCalled();
    expect(apiSavedPropertiesCreateFetcherModule.apiSavedPropertiesCreateFetcher).not.toHaveBeenCalled();
  });
});
