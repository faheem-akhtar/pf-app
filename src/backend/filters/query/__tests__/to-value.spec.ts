import { FiltersQueryInterface } from 'components/filters/query/interface';
import { configCommon } from 'config/common';

import { backendFiltersQueryToValue } from '../to-value';

describe('backendFiltersQueryToValue()', () => {
  it('should have matched params for the category', () => {
    expect(
      backendFiltersQueryToValue(
        { c: '2', pattern: '/categorySlug/propertyTypeSlug-saleType.html' } as FiltersQueryInterface,
        configCommon.language.current
      )
    ).toMatchInlineSnapshot(`
      Object {
        "filter[amenities]": Array [],
        "filter[category_id]": "2",
        "filter[furnished]": "0",
        "filter[keywords]": "",
        "filter[locations_ids]": Array [],
        "filter[max_area]": null,
        "filter[max_bathroom]": "",
        "filter[max_bedroom]": "",
        "filter[max_price]": null,
        "filter[min_area]": null,
        "filter[min_bathroom]": "",
        "filter[min_bedroom]": "",
        "filter[min_price]": null,
        "filter[price_type]": "y",
        "filter[property_type_id]": "",
        "filter[virtual_viewings]": "",
        "page[number]": 1,
        "sort": "mr",
      }
    `);
  });
});
