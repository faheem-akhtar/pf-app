import { filtersContextPropsStub } from 'stubs/filters/context-props.stub';
import { filtersValueStub } from 'stubs/filters/value/stub';
import { locationCompactStub } from 'stubs/location/compact.stub';

import { FiltersCategoryIdEnum } from 'enums/filters/category-id.enum';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';

import { FiltersValueFieldPropertyTypeIdType } from '../field/property-type-id.type';
import { filtersValueProcessChange } from '../process-change';

describe('filtersValueProcessChange()', () => {
  it('should have initial state with location and category when the category is changed', () => {
    const { filtersValueFromQuery, filtersData } = filtersContextPropsStub({
      [FiltersParametersEnum.propertyTypeId]: '41' as FiltersValueFieldPropertyTypeIdType,
      [FiltersParametersEnum.minArea]: 500,
      [FiltersParametersEnum.maxArea]: 1500,
    });

    expect(
      filtersValueProcessChange(
        filtersData,
        filtersValueFromQuery,
        filtersValueStub({
          [FiltersParametersEnum.categoryId]: FiltersCategoryIdEnum.residentialForSale,
          [FiltersParametersEnum.locationsIds]: [locationCompactStub()],
        })
      )
    ).toEqual(
      expect.objectContaining({
        [FiltersParametersEnum.categoryId]: FiltersCategoryIdEnum.residentialForSale,
        [FiltersParametersEnum.locationsIds]: [locationCompactStub()],
        [FiltersParametersEnum.propertyTypeId]: '',
        [FiltersParametersEnum.minArea]: null,
        [FiltersParametersEnum.maxArea]: null,
      })
    );
  });

  it('should apply new filters when the category is not changed', () => {
    const { filtersValueFromQuery, filtersData } = filtersContextPropsStub({
      [FiltersParametersEnum.propertyTypeId]: '41' as FiltersValueFieldPropertyTypeIdType,
      [FiltersParametersEnum.minArea]: 500,
      [FiltersParametersEnum.maxArea]: 1500,
    });

    expect(
      filtersValueProcessChange(
        filtersData,
        filtersValueFromQuery,
        filtersValueStub({
          [FiltersParametersEnum.locationsIds]: [locationCompactStub()],
          [FiltersParametersEnum.minPrice]: 500,
          [FiltersParametersEnum.maxPrice]: 2500,
        })
      )
    ).toEqual(
      expect.objectContaining({
        [FiltersParametersEnum.categoryId]: FiltersCategoryIdEnum.residentialForRent,
        [FiltersParametersEnum.locationsIds]: [locationCompactStub()],
        [FiltersParametersEnum.propertyTypeId]: '',
        [FiltersParametersEnum.minArea]: null,
        [FiltersParametersEnum.maxArea]: null,
        [FiltersParametersEnum.minPrice]: 500,
        [FiltersParametersEnum.maxPrice]: 2500,
      })
    );
  });
});
