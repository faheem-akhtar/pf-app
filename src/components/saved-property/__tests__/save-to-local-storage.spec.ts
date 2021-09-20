import { WindowService } from 'services/window/service';

import { savedPropertySaveToLocalStorage } from '../save-to-local-storage';

jest.mock('services/window/service');

describe('savedPropertySaveToLocalStorage', () => {
  it('should save saved properties to local storage', () => {
    expect(
      savedPropertySaveToLocalStorage([
        {
          id: '1',
          propertyId: 100,
          saveDate: '2021-09-14',
        },
      ])
    );

    expect(WindowService.localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(WindowService.localStorage.setItem).toHaveBeenCalledWith('saved-properties', [
      {
        property_id: 100,
        save_date: '2021-09-14',
      },
    ]);
  });
});
