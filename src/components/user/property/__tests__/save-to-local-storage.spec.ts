import { WindowService } from 'services/window/service';

import { userPropertySaveToLocalStorage } from '../save-to-local-storage';

jest.mock('services/window/service');

describe('userPropertySaveToLocalStorage', () => {
  beforeEach(() => {
    (WindowService.localStorage.setItem as jest.Mock).mockClear();
  });

  it('should save data to local storage', () => {
    userPropertySaveToLocalStorage('my-key', [
      {
        propertyId: 1,
        name: 'abc',
        someValue: 'my value',
      },
      {
        propertyId: 2,
        name: 'abc 2',
        someValue: 'my value 2',
      },
    ]);

    expect(WindowService.localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(WindowService.localStorage.setItem).toHaveBeenCalledWith('my-key', [
      {
        property_id: 1,
        name: 'abc',
        some_value: 'my value',
      },
      {
        property_id: 2,
        name: 'abc 2',
        some_value: 'my value 2',
      },
    ]);
  });
});
