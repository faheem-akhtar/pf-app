import { ApiSavedPropertiesRequestInterface } from 'api/saved-properties/request.interface';
import { WindowService } from 'services/window/service';

import { savedPropertyLoadFromLocalStorage } from '../load-from-local-storage';

jest.mock('services/window/service');

describe('savedPropertyLoadFromLocalStorage', () => {
  it('should return an empty array if data not there on local storage', () => {
    expect(savedPropertyLoadFromLocalStorage()).toEqual([]);

    expect(WindowService.localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(WindowService.localStorage.getItem).toHaveBeenCalledWith('saved-properties');
  });

  it('should return the data from the local storage', () => {
    (WindowService.localStorage.getItem as jest.Mock).mockReturnValue([
      {
        property_id: 100,
        save_date: '2021-09-14',
      } as ApiSavedPropertiesRequestInterface,
    ]);

    expect(savedPropertyLoadFromLocalStorage()).toEqual([
      {
        propertyId: 100,
        saveDate: '2021-09-14',
      },
    ]);
  });
});
