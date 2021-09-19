import { ContactedPropertyTypeEnum } from 'enums/contacted-property/type.enum';
import { WindowService } from 'services/window/service';

import { contactedPropertySaveToLocalStorage } from '../save-to-local-storage';

jest.mock('services/window/service');

describe('contactedPropertySaveToLocalStorage', () => {
  it('should save contacted properties to local storage', () => {
    expect(
      contactedPropertySaveToLocalStorage([
        {
          id: '1',
          propertyId: 100,
          contactType: ContactedPropertyTypeEnum.whatsApp,
          contactDate: '2021-09-14',
        },
      ])
    );

    expect(WindowService.localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(WindowService.localStorage.setItem).toHaveBeenCalledWith('contacted-properties', [
      {
        property_id: 100,
        contact_type: 'WHATSAPP',
        contact_date: '2021-09-14',
      },
    ]);
  });
});
