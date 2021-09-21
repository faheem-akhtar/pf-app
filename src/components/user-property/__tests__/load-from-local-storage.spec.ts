import { WindowService } from 'services/window/service';

import { userPropertyLoadFromLocalStorage } from '../load-from-local-storage';

jest.mock('services/window/service');

describe('userPropertyLoadFromLocalStorage', () => {
  beforeEach(() => {
    (WindowService.localStorage.getItem as jest.Mock).mockClear();
  });

  it('should load data from local storage', () => {
    (WindowService.localStorage.getItem as jest.Mock).mockReturnValue([
      {
        my_id: '1',
        name: 'abc',
        some_value: 'my value',
      },
    ]);
    expect(userPropertyLoadFromLocalStorage('my key')).toEqual([
      {
        myId: '1',
        name: 'abc',
        someValue: 'my value',
      },
    ]);
  });

  it('should return empty array if nothing safed in the local storage', () => {
    (WindowService.localStorage.getItem as jest.Mock).mockReturnValue(null);

    expect(userPropertyLoadFromLocalStorage('my key')).toEqual([]);
  });
});
