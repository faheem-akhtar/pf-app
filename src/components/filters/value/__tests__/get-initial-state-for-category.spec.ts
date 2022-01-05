import { filtersContextPropsStub } from 'stubs/filters/context-props.stub';
import { locationCompactStub } from 'stubs/location/compact.stub';

import { FiltersCategoryIdEnum } from 'enums/filters/category-id.enum';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';

import { FiltersValueFieldPropertyTypeIdType } from '../field/property-type-id.type';
import { filtersValueGetInitialStateForCategory } from '../get-initial-state-for-category';

describe('filtersValueGetInitialStateForCategory()', () => {
  it('should have initial state but keep the location and category', () => {
    const { filtersValueFromQuery, filtersData } = filtersContextPropsStub({
      [FiltersParametersEnum.categoryId]: FiltersCategoryIdEnum.residentialForSale,
      [FiltersParametersEnum.locationsIds]: [locationCompactStub()],
      [FiltersParametersEnum.propertyTypeId]: '41' as FiltersValueFieldPropertyTypeIdType,
      [FiltersParametersEnum.minArea]: 500,
      [FiltersParametersEnum.maxArea]: 1500,
    });

    expect(filtersValueGetInitialStateForCategory(filtersData, filtersValueFromQuery)).toEqual(
      expect.objectContaining({
        [FiltersParametersEnum.categoryId]: FiltersCategoryIdEnum.residentialForSale,
        [FiltersParametersEnum.locationsIds]: [locationCompactStub()],
        [FiltersParametersEnum.propertyTypeId]: '',
        [FiltersParametersEnum.minArea]: null,
        [FiltersParametersEnum.maxArea]: null,
      })
    );
  });
});
