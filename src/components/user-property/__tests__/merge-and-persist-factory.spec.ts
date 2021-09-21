import { WindowService } from 'services/window/service';

import { UserPropertyMergeAndPersistFactory } from '../merge-and-persist-factory';

jest.mock('services/window/service');

describe('UserPropertyMergeAndPersistFactory', () => {
  const fetcherMock = jest.fn();
  let userPropertyMergeAndPersist: (
    properties: { propertyId: number; date: string }[]
  ) => { propertyId: number; date: string }[];

  beforeEach(() => {
    (WindowService.localStorage.getItem as jest.Mock).mockClear();
    (WindowService.localStorage.setItem as jest.Mock).mockClear();
    fetcherMock.mockClear();

    userPropertyMergeAndPersist = UserPropertyMergeAndPersistFactory('my-key', fetcherMock);
  });

  it('should save to the local storage and to the server', () => {
    (WindowService.localStorage.getItem as jest.Mock).mockReturnValue([
      {
        property_id: 2,
        date: '2021-09-14',
      },
    ]);

    expect(
      userPropertyMergeAndPersist([
        {
          propertyId: 1,
          date: '2021-09-14',
        },
      ])
    ).toEqual([
      {
        propertyId: 1,
        date: '2021-09-14',
      },
      {
        propertyId: 2,
        date: '2021-09-14',
      },
    ]);
    expect(WindowService.localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(WindowService.localStorage.setItem).toHaveBeenCalledWith('my-key', [
      {
        property_id: 1,
        date: '2021-09-14',
      },
      {
        property_id: 2,
        date: '2021-09-14',
      },
    ]);

    expect(fetcherMock).toHaveBeenCalledTimes(1);
    expect(fetcherMock).toHaveBeenCalledWith(
      {
        propertyId: 2,
        date: '2021-09-14',
      },
      expect.anything(),
      expect.anything()
    );
  });

  it('should not save to local storage nor to server if it already exists', () => {
    (WindowService.localStorage.getItem as jest.Mock).mockReturnValue([
      {
        property_id: 2,
        date: '2021-09-14',
      },
    ]);

    expect(
      userPropertyMergeAndPersist([
        {
          propertyId: 2,
          date: '2021-09-14',
        },
      ])
    ).toEqual([
      {
        propertyId: 2,
        date: '2021-09-14',
      },
    ]);

    expect(WindowService.localStorage.setItem).not.toHaveBeenCalled();
    expect(fetcherMock).not.toHaveBeenCalled();
  });
});
