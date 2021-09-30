import { BackendModelSaveSearchInterface } from 'backend/model/save-search/interface';
import { SaveSearchFrequencyEnum } from 'enums/save-search/frequency.enum';

import { backendApiSaveSearchMapper } from '../mapper';

describe('backendApiSaveSearchMapper', () => {
  it('should mapped to save search modal for a single value', () => {
    expect(
      backendApiSaveSearchMapper({
        id: '1',
        name: 'my search',
        frequency: SaveSearchFrequencyEnum.DAILY,
        formatted_filters: 'Apartments for rent',
      } as BackendModelSaveSearchInterface)
    ).toMatchInlineSnapshot(`
      Array [
        Object {
          "filters": undefined,
          "formatted_filters": "Apartments for rent",
          "frequency": "daily",
          "id": "1",
          "name": "my search",
        },
      ]
    `);
  });

  it('should mapped to save search modal for multiple values', () => {
    expect(
      backendApiSaveSearchMapper([
        {
          id: '1',
          name: 'my search',
          frequency: SaveSearchFrequencyEnum.DAILY,
          formatted_filters: 'Apartments for rent',
        } as BackendModelSaveSearchInterface,
        {
          id: '2',
          name: 'my Save search',
          frequency: SaveSearchFrequencyEnum.DAILY,
          formatted_filters: 'Buy apartments in UAE',
        } as BackendModelSaveSearchInterface,
      ])
    ).toMatchInlineSnapshot(`
      Array [
        Object {
          "filters": undefined,
          "formatted_filters": "Apartments for rent",
          "frequency": "daily",
          "id": "1",
          "name": "my search",
        },
        Object {
          "filters": undefined,
          "formatted_filters": "Buy apartments in UAE",
          "frequency": "daily",
          "id": "2",
          "name": "my Save search",
        },
      ]
    `);
  });
});
