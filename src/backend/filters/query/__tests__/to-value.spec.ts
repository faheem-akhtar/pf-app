import { locationCompactStub } from 'stubs/location/compact.stub';

import { FiltersQueryInterface } from 'components/filters/query/interface';
import { configCommon } from 'config/common';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';

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
        "filter[max_price]": null,
        "filter[min_area]": null,
        "filter[min_price]": null,
        "filter[number_of_bathrooms]": Array [],
        "filter[number_of_bedrooms]": Array [],
        "filter[price_type]": "y",
        "filter[property_type_id]": "",
        "filter[virtual_viewings]": "",
        "page[number]": 1,
        "sort": "mr",
      }
    `);
  });

  it('should be able to find the locations by ids', () => {
    expect(
      backendFiltersQueryToValue({ c: '2', l: '6-1' } as FiltersQueryInterface, configCommon.language.current)
    ).toEqual(
      expect.objectContaining({
        [FiltersParametersEnum.locationsIds]: [
          locationCompactStub(),
          locationCompactStub({
            name: 'Dubai',
            slug: 'dubai',
            id: '1',
            path: 'Dubai',
          }),
        ],
      })
    );
  });

  it('should have fallback value when no location id params', () => {
    expect(backendFiltersQueryToValue({ c: '2' } as FiltersQueryInterface, configCommon.language.current)).toEqual(
      expect.objectContaining({
        [FiltersParametersEnum.locationsIds]: [],
      })
    );
  });

  it('should be able to handle multiple array params for a single value', () => {
    expect(
      backendFiltersQueryToValue(
        { c: '2', 'bdr[]': '0', 'btr[]': '1', 'am[]': 'BA' } as unknown as FiltersQueryInterface,
        configCommon.language.current
      )
    ).toEqual(
      expect.objectContaining({
        [FiltersParametersEnum.bedrooms]: ['0'],
        [FiltersParametersEnum.bathrooms]: ['1'],
        [FiltersParametersEnum.amenities]: ['BA'],
      })
    );
  });

  it('should be able to handle multiple array params for multiple values', () => {
    expect(
      backendFiltersQueryToValue(
        { c: '2', 'bdr[]': ['0', '1'], 'btr[]': ['1', '2'], 'am[]': ['BA', 'CA'] } as unknown as FiltersQueryInterface,
        configCommon.language.current
      )
    ).toEqual(
      expect.objectContaining({
        [FiltersParametersEnum.bedrooms]: ['0', '1'],
        [FiltersParametersEnum.bathrooms]: ['1', '2'],
        [FiltersParametersEnum.amenities]: ['BA', 'CA'],
      })
    );
  });

  it('should be able to handle multiple array params for an empty value', () => {
    expect(
      backendFiltersQueryToValue(
        { c: '2', 'bdr[]': '', 'btr[]': '', 'am[]': '' } as unknown as FiltersQueryInterface,
        configCommon.language.current
      )
    ).toEqual(
      expect.objectContaining({
        [FiltersParametersEnum.bedrooms]: [],
        [FiltersParametersEnum.bathrooms]: [],
        [FiltersParametersEnum.amenities]: [],
      })
    );
  });
});
