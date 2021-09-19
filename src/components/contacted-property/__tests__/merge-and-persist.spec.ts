import * as apiContactedPropertiesCreateFetcherModule from 'api/contacted-properties/create/fetcher';
import { ContactedPropertyTypeEnum } from 'enums/contacted-property/type.enum';
import { WindowService } from 'services/window/service';

import { contactedPropertyMergeAndPersist } from '../merge-and-persist';

jest.mock('services/window/service');
jest.mock('api/contacted-properties/create/fetcher');

describe('contactedPropertyMergeAndPersist', () => {
  beforeEach(() => {
    (WindowService.localStorage.getItem as jest.Mock).mockClear();
    (WindowService.localStorage.setItem as jest.Mock).mockClear();

    (apiContactedPropertiesCreateFetcherModule.apiContactedPropertiesCreateFetcher as jest.Mock).mockClear();
  });

  it('should save to the local storage and to the server', () => {
    (WindowService.localStorage.getItem as jest.Mock).mockReturnValue([
      {
        property_id: 2,
        contact_date: '2021-09-14',
        contact_type: ContactedPropertyTypeEnum.whatsApp,
      },
    ]);

    expect(
      contactedPropertyMergeAndPersist([
        {
          id: '1',
          propertyId: 1,
          contactDate: '2021-09-14',
          contactType: ContactedPropertyTypeEnum.email,
        },
      ])
    ).toEqual([
      {
        id: '1',
        propertyId: 1,
        contactDate: '2021-09-14',
        contactType: 'EMAIL',
      },
      {
        propertyId: 2,
        contactDate: '2021-09-14',
        contactType: 'WHATSAPP',
      },
    ]);
    expect(WindowService.localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(WindowService.localStorage.setItem).toHaveBeenCalledWith('contacted-properties', [
      {
        property_id: 1,
        contact_date: '2021-09-14',
        contact_type: 'EMAIL',
      },
      {
        property_id: 2,
        contact_date: '2021-09-14',
        contact_type: 'WHATSAPP',
      },
    ]);

    expect(apiContactedPropertiesCreateFetcherModule.apiContactedPropertiesCreateFetcher).toHaveBeenCalledTimes(1);
    expect(apiContactedPropertiesCreateFetcherModule.apiContactedPropertiesCreateFetcher).toHaveBeenCalledWith(
      {
        propertyId: 2,
        contactDate: '2021-09-14',
        contactType: ContactedPropertyTypeEnum.whatsApp,
      },
      expect.anything(),
      expect.anything()
    );
  });

  it('should not save to local storage nor to server if it already exists', () => {
    (WindowService.localStorage.getItem as jest.Mock).mockReturnValue([
      {
        property_id: 2,
        contact_date: '2021-09-14',
        contact_type: ContactedPropertyTypeEnum.whatsApp,
      },
    ]);

    expect(
      contactedPropertyMergeAndPersist([
        {
          id: '1',
          propertyId: 2,
          contactDate: '2021-09-14',
          contactType: ContactedPropertyTypeEnum.whatsApp,
        },
      ])
    ).toEqual([
      {
        id: '1',
        propertyId: 2,
        contactDate: '2021-09-14',
        contactType: 'WHATSAPP',
      },
    ]);

    expect(WindowService.localStorage.setItem).not.toHaveBeenCalled();
    expect(apiContactedPropertiesCreateFetcherModule.apiContactedPropertiesCreateFetcher).not.toHaveBeenCalled();
  });
});
