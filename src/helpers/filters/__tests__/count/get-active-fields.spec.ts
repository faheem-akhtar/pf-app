import { filtersDataStub } from 'stubs/filters/data.stub';
import { filtersValueStub } from 'stubs/filters/value/stub';

import { FiltersValueFieldAmenitiesType } from 'components/filters/value/field/amenities.type';
import { FiltersValueFieldBathroomsType } from 'components/filters/value/field/bathrooms.type';
import { FiltersValueFieldBedroomsType } from 'components/filters/value/field/bedrooms.type';
import { FiltersValueFieldFurnishedType } from 'components/filters/value/field/furnished.type';
import { FiltersValueInterface } from 'components/filters/value/interface';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { filtersCountGetActiveFields } from 'helpers/filters/count/get-active-fields';

describe('filtersCountGetActiveFields()', () => {
  let sampleFilterValues: FiltersValueInterface;
  beforeEach(() => {
    sampleFilterValues = filtersValueStub();
  });

  it('should return 0 for initial filters', () => {
    expect(
      filtersCountGetActiveFields({
        value: sampleFilterValues,
        data: filtersDataStub(),
      })
    ).toBe(0);
  });

  it('should return the count of the fields which have not-default value', () => {
    sampleFilterValues[FiltersParametersEnum.keyword] = 'lorem';
    sampleFilterValues[FiltersParametersEnum.furnishing] = 'asd' as FiltersValueFieldFurnishedType;
    expect(
      filtersCountGetActiveFields({
        value: sampleFilterValues,
        data: filtersDataStub(),
      })
    ).toBe(2);
  });

  it('should return the count of the fields for pair-defined and array values', () => {
    sampleFilterValues[FiltersParametersEnum.amenities] = [{}, {}] as FiltersValueFieldAmenitiesType[];
    sampleFilterValues[FiltersParametersEnum.bedrooms] = [{}, {}] as FiltersValueFieldBedroomsType[];
    sampleFilterValues[FiltersParametersEnum.bathrooms] = [{}, {}] as FiltersValueFieldBathroomsType[];
    sampleFilterValues[FiltersParametersEnum.minPrice] = 1234;
    sampleFilterValues[FiltersParametersEnum.maxArea] = 1234;
    expect(
      filtersCountGetActiveFields({
        value: sampleFilterValues,
        data: filtersDataStub(),
      })
    ).toBe(5);
  });
});
