import { BackendModelContactedPropertyInterface } from 'backend/model/contacted-property/interface';
import { ContactedPropertyTypeEnum } from 'enums/contacted-property/type.enum';

import { backendApiContactedPropertyMapper } from '../mapper';

describe('backendApiContactedPropertyMapper', () => {
  it('should mapped to contacted property modal for a single value', () => {
    expect(
      backendApiContactedPropertyMapper({
        id: '1',
        property_id: 100,
        contact_type: ContactedPropertyTypeEnum.email,
        contact_date: '2021-09-14',
      } as BackendModelContactedPropertyInterface)
    ).toMatchInlineSnapshot(`
      Array [
        Object {
          "contactDate": "2021-09-14",
          "contactType": "EMAIL",
          "id": "1",
          "propertyId": 100,
        },
      ]
    `);
  });

  it('should mapped to contacted property modal for multiple values', () => {
    expect(
      backendApiContactedPropertyMapper([
        {
          id: '1',
          property_id: 100,
          contact_type: ContactedPropertyTypeEnum.email,
          contact_date: '2021-09-14',
        } as BackendModelContactedPropertyInterface,
        {
          id: '2',
          property_id: 101,
          contact_type: ContactedPropertyTypeEnum.email,
          contact_date: '2021-09-14',
        } as BackendModelContactedPropertyInterface,
      ])
    ).toMatchInlineSnapshot(`
      Array [
        Object {
          "contactDate": "2021-09-14",
          "contactType": "EMAIL",
          "id": "1",
          "propertyId": 100,
        },
        Object {
          "contactDate": "2021-09-14",
          "contactType": "EMAIL",
          "id": "2",
          "propertyId": 101,
        },
      ]
    `);
  });
});
