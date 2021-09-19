import { ApiContactedPropertiesCreateRequestInterface } from 'api/contacted-properties/create/request.interface';
import { ContactedPropertyTypeEnum } from 'enums/contacted-property/type.enum';
import { WindowService } from 'services/window/service';

import { contactedPropertyLoadFromLocalStorage } from '../load-from-local-storage';

jest.mock('services/window/service');

describe('contactedPropertyLoadFromLocalStorage', () => {
  it('should return an empty array if data not there on local storage', () => {
    expect(contactedPropertyLoadFromLocalStorage()).toEqual([]);

    expect(WindowService.localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(WindowService.localStorage.getItem).toHaveBeenCalledWith('contacted-properties');
  });

  it('should return the data from the local storage', () => {
    (WindowService.localStorage.getItem as jest.Mock).mockReturnValue([
      {
        property_id: 100,
        contact_date: '2021-09-14',
        contact_type: ContactedPropertyTypeEnum.email,
      } as ApiContactedPropertiesCreateRequestInterface,
    ]);

    expect(contactedPropertyLoadFromLocalStorage()).toEqual([
      {
        propertyId: 100,
        contactDate: '2021-09-14',
        contactType: ContactedPropertyTypeEnum.email,
      },
    ]);
  });
});
