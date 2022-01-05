import { filtersContextPropsStub } from 'stubs/filters/context-props.stub';
import { locationCompactKcStub } from 'stubs/location';

import { backendFiltersValueDefault } from 'backend/filters/value/default';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';

import { filtersValueEquals } from '../equals';
import { FiltersValueFieldFurnishedType } from '../field/furnished.type';

describe('filtersValueEquals()', () => {
  it('should be equal', () => {
    const { filtersValueFromQuery } = filtersContextPropsStub({
      [FiltersParametersEnum.furnishing]: '0' as FiltersValueFieldFurnishedType,
      [FiltersParametersEnum.sort]: '',
    });

    expect(filtersValueEquals(filtersValueFromQuery, backendFiltersValueDefault)).toBeTruthy();
  });

  it('should be equal even the ignored params are different', () => {
    const { filtersValueFromQuery } = filtersContextPropsStub({
      [FiltersParametersEnum.furnishing]: '0' as FiltersValueFieldFurnishedType,
      [FiltersParametersEnum.pageNumber]: 2,
      [FiltersParametersEnum.locationsIds]: [locationCompactKcStub],
    });

    expect(filtersValueEquals(filtersValueFromQuery, backendFiltersValueDefault)).toBeTruthy();
  });

  it('should not be equal', () => {
    const { filtersValueFromQuery } = filtersContextPropsStub();

    expect(filtersValueEquals(filtersValueFromQuery, backendFiltersValueDefault)).toBeFalsy();
  });

  it('should not be equal even the ignored params are the same', () => {
    const { filtersValueFromQuery } = filtersContextPropsStub();

    expect(filtersValueEquals(filtersValueFromQuery, backendFiltersValueDefault)).toBeFalsy();
  });
});
