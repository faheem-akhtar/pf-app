import { FiltersQueryInterface } from 'components/filters/query/interface';
import { configCommon } from 'config/common';

import { backendFiltersQueryToValue } from '../to-value';

describe('backendFiltersQueryToValue() Egypt', () => {
  it('should have matched params for the category', () => {
    expect(
      backendFiltersQueryToValue(
        { c: '2', 'bdr[]': ['4'], pattern: '/categorySlug/propertyTypeSlug-saleType.html' } as FiltersQueryInterface,
        configCommon.language.current
      )
    ).toMatchInlineSnapshot(`
      Object {
        "filter[category_id]": "2",
        "filter[furnished]": "0",
        "filter[keywords]": "",
        "filter[locations_ids]": Array [],
        "filter[max_area]": null,
        "filter[max_price]": null,
        "filter[min_area]": null,
        "filter[min_price]": null,
        "filter[number_of_bathrooms]": Array [],
        "filter[number_of_bedrooms]": Array [
          "4",
        ],
        "filter[price_type]": "m",
        "filter[property_type_id]": "",
        "page[number]": 1,
        "sort": "mr",
      }
    `);
  });
});
