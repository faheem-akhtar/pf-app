import { mockWindowFetch } from 'mocks/window/fetch.mock';
import { jwtTokenStoreStub } from 'stubs/jwt/token/store.stub';

import { ContactedPropertyInterface } from 'components/contacted-property/interface';
import { ContactedPropertyTypeEnum } from 'enums/contacted-property/type.enum';

import { apiContactedPropertiesCreateFetcher } from '../fetcher';

jest.mock('services/jwt/token/store', () => ({
  JwtTokenStore: jest.fn().mockImplementation(() => jwtTokenStoreStub()),
}));

describe('apiContactedPropertiesCreateFetcher', () => {
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
          'x-pf-jwt': 'Bearer mocked token',
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

  it('should get contact type as a default value when it is not exist', async () => {
    const factoryMock = mockWindowFetch();

    await apiContactedPropertiesCreateFetcher({
      propertyId: 1,
      contactDate: '2021-09-14',
    } as ContactedPropertyInterface);

    expect(factoryMock).toHaveBeenCalledTimes(1);
    expect(factoryMock).toHaveBeenCalledWith(
      expect.stringContaining('/contacted-property'),
      expect.objectContaining({
        method: 'POST',
        headers: {
          locale: 'en',
          'content-type': 'application/vnd.api+json',
          'x-pf-jwt': 'Bearer mocked token',
        },
        body: JSON.stringify({
          data: {
            type: 'contacted_property',
            attributes: {
              property_id: 1,
              contact_type: 'CALL',
              contact_date: '2021-09-14',
            },
          },
        }),
      })
    );
  });
});
