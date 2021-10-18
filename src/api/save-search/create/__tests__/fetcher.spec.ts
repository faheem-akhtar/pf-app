import { mockWindowFetch } from 'mocks/window/fetch.mock';
import { jwtTokenStoreStub } from 'stubs/jwt/token/store.stub';
import { saveSearchDataStub } from 'stubs/save-search/data.stub';

import { FiltersValueInterface } from 'components/filters/value/interface';
import { SaveSearchLoadResultInterface } from 'components/save-search/load-result-interface';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { SaveSearchFrequencyEnum } from 'enums/save-search/frequency.enum';
import { LocationCompactInterface } from 'types/location/compact.interface';

import { apiSaveSearchCreateFetcher } from '../fetcher';

jest.mock('services/jwt/token/store', () => ({
  JwtTokenStore: jest.fn().mockImplementation(() => jwtTokenStoreStub()),
}));

describe('apiSaveSearchCreateFetcher', () => {
  it('should send a post request', async () => {
    const dataMock = saveSearchDataStub();
    const factoryMock = mockWindowFetch({
      json: (): Promise<SaveSearchLoadResultInterface[]> => Promise.resolve([dataMock]),
    });

    const response = await apiSaveSearchCreateFetcher({
      name: 'my search name',
      frequency: SaveSearchFrequencyEnum.DAILY,
      filters: {
        [FiltersParametersEnum.locationsIds]: [
          {
            id: '50',
            name: 'Dubai Marina',
          } as LocationCompactInterface,
        ],
      } as FiltersValueInterface,
    });

    expect(factoryMock).toHaveBeenCalledTimes(1);
    expect(factoryMock).toHaveBeenCalledWith('default-origin/en/api/pwa/saved-search', {
      method: 'POST',
      headers: {
        locale: 'en',
        'content-type': 'application/vnd.api+json',
        'x-pf-jwt': 'Bearer mocked token',
      },
      body: JSON.stringify({
        data: {
          type: 'saved_search',
          attributes: {
            name: 'my search name',
            frequency: 'daily',
            filters: {
              location_ids: ['50'],
            },
          },
        },
      }),
    });
    expect(response).toEqual(
      expect.objectContaining({
        data: dataMock,
      })
    );
  });
});
