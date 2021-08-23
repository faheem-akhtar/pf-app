import { filtersCountGetActiveFields } from 'helpers/filters/count/get-active-fields';
import { FiltersDataMock } from 'mocks/filters/data.mock';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersValueFieldAmenitiesType } from 'components/filters/value/field/amenities.type';
import { FiltersValueFieldFurnishedType } from 'components/filters/value/field/furnished.type';
import { FiltersValueInterface } from 'components/filters/value/interface';
import { FiltersValueMock } from 'mocks/filters/value.mock';

describe('filtersCountGetActiveFields()', () => {
  let sampleFilterValues: FiltersValueInterface;
  beforeEach(() => {
    sampleFilterValues = FiltersValueMock();
  });

  it('should return 0 for initial filters', () => {
    expect(
      filtersCountGetActiveFields({
        value: sampleFilterValues,
        data: FiltersDataMock,
      })
    ).toBe(0);
  });

  it('should return the count of the fields which have not-default value', () => {
    sampleFilterValues[FiltersParametersEnum.keyword] = 'lorem';
    sampleFilterValues[FiltersParametersEnum.furnishing] = 'asd' as FiltersValueFieldFurnishedType;
    expect(
      filtersCountGetActiveFields({
        value: sampleFilterValues,
        data: FiltersDataMock,
      })
    ).toBe(2);
  });

  it('should return the count of the fields for pair-defined and array values', () => {
    sampleFilterValues[FiltersParametersEnum.amenities] = [{}, {}] as FiltersValueFieldAmenitiesType[];
    sampleFilterValues[FiltersParametersEnum.minPrice] = 1234;
    sampleFilterValues[FiltersParametersEnum.maxArea] = 1234;
    expect(
      filtersCountGetActiveFields({
        value: sampleFilterValues,
        data: FiltersDataMock,
      })
    ).toBe(2);
  });
});