import { mockWindowFetch } from 'mocks/window/fetch.mock';

import { ContactedPropertyTypeEnum } from 'enums/contacted-property/type.enum';
import { JwtTokenStore } from 'services/jwt/token/store';

import { apiContactedPropertiesCreateFetcher } from '../fetcher';

jest.mock('services/jwt/token/store');

describe('apiContactedPropertiesCreateFetcher', () => {
  beforeEach(() => {
    global.origin = 'test.origin';
    ((JwtTokenStore as jest.Mock).mock.instances[0].getToken as jest.Mock).mockReturnValue('my token');
  });

  it('should send a post request', async () => {
    const factoryMock = mockWindowFetch();

    await apiContactedPropertiesCreateFetcher({
      propertyId: 1,
      contactDate: '2021-09-14',
      contactType: ContactedPropertyTypeEnum.email,
    });

    expect(factoryMock).toHaveBeenCalledTimes(1);
    expect(factoryMock).toHaveBeenCalledWith(
      expect.stringContaining('/contacted-property'),
      expect.objectContaining({
        method: 'POST',
        headers: {
          locale: 'en',
          'content-type': 'application/vnd.api+json',
          'x-pf-jwt': 'Bearer my token',
        },
        body: JSON.stringify({
          data: {
            type: 'contacted_property',
            attributes: {
              property_id: 1,
              contact_type: 'EMAIL',
              contact_date: '2021-09-14',
            },
          },
        }),
      })
    );
  });
});
