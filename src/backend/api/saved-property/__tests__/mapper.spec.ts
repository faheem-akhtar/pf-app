import { BackendModelSavedPropertyInterface } from 'backend/model/saved-property/interface';

import { backendApiSavedPropertyMapper } from '../mapper';

describe('backendApiSavedPropertyMapper', () => {
  it('should mapped to saved property modal for a single value', () => {
    expect(
      backendApiSavedPropertyMapper({
        id: '1',
        property_id: 100,
        save_date: '2021-09-14',
      } as BackendModelSavedPropertyInterface)
    ).toMatchInlineSnapshot(`
      Array [
        Object {
          "id": "1",
          "propertyId": 100,
          "saveDate": "2021-09-14",
        },
      ]
    `);
  });

  it('should mapped to saved property modal for multiple values', () => {
    expect(
      backendApiSavedPropertyMapper([
        {
          id: '1',
          property_id: 100,
          save_date: '2021-09-14',
        } as BackendModelSavedPropertyInterface,
        {
          id: '2',
          property_id: 101,
          save_date: '2021-09-14',
        } as BackendModelSavedPropertyInterface,
      ])
    ).toMatchInlineSnapshot(`
      Array [
        Object {
          "id": "1",
          "propertyId": 100,
          "saveDate": "2021-09-14",
        },
        Object {
          "id": "2",
          "propertyId": 101,
          "saveDate": "2021-09-14",
        },
      ]
    `);
  });
});
