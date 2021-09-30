import { filtersValueStub } from 'stubs/filters/value/stub';

import { FiltersValueFieldAmenitiesType } from 'components/filters/value/field/amenities.type';
import { FiltersValueFieldCompletionStatusType } from 'components/filters/value/field/completion-status.type';
import { FiltersValueFieldFurnishedType } from 'components/filters/value/field/furnished.type';
import { FiltersValueFieldMaxBathroomType } from 'components/filters/value/field/max-bathroom.type';
import { FiltersValueFieldMinBedroomType } from 'components/filters/value/field/min-bedroom.type';
import { FiltersValueFieldPaymentMethodType } from 'components/filters/value/field/payment-method.type';
import { FiltersValueFieldPricePeriodType } from 'components/filters/value/field/price-period.type';
import { FiltersValueInterface } from 'components/filters/value/interface';
import { FiltersCategoryIdEnum } from 'enums/filters/category-id.enum';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { PropertyPriceTypeShortEnum } from 'enums/property/price-type-short.enum';
import { LocationCompactInterface } from 'types/location/compact.interface';

import { SaveSearchFiltersInterface } from '../filters.interface';
import { saveSearchFiltersMapper } from '../filters-mapper';

const exampleSaveSearchFilters: FiltersValueInterface = {
  ...filtersValueStub(),
  [FiltersParametersEnum.categoryId]: FiltersCategoryIdEnum.residentialForRent,
  [FiltersParametersEnum.pricePeriod]: PropertyPriceTypeShortEnum.yearly as FiltersValueFieldPricePeriodType,
  [FiltersParametersEnum.amenities]: ['A' as FiltersValueFieldAmenitiesType, 'B' as FiltersValueFieldAmenitiesType],
  [FiltersParametersEnum.furnishing]: '1' as FiltersValueFieldFurnishedType,
  [FiltersParametersEnum.completionStatus]: 'completion' as FiltersValueFieldCompletionStatusType,
  [FiltersParametersEnum.keyword]: 'lorem, ipsum',
  [FiltersParametersEnum.locationsIds]: [
    { id: 'L1' } as LocationCompactInterface,
    { id: 'L2' } as LocationCompactInterface,
  ],
  [FiltersParametersEnum.maxBathroom]: '3' as FiltersValueFieldMaxBathroomType,
  [FiltersParametersEnum.paymentMethod]: 'payment' as FiltersValueFieldPaymentMethodType,
  [FiltersParametersEnum.minBedroom]: '0' as FiltersValueFieldMinBedroomType,
};

describe('saveSearchFiltersMapper', () => {
  let filterParams: SaveSearchFiltersInterface;
  beforeEach(() => {
    filterParams = saveSearchFiltersMapper(exampleSaveSearchFilters);
  });

  it('should exclude not-valid parameters', () => {
    expect(filterParams).not.toContain(
      expect.objectContaining({
        max_bathroom: '',
      })
    );
  });

  it('should transform all valid values to filter params', () => {
    expect(filterParams).toEqual({
      category_id: 2,
      price_type: 'y',
      amenities: ['A', 'B'],
      furnished: 1,
      completion_status: 'completion',
      keyword: 'lorem, ipsum',
      location_ids: ['L1', 'L2'],
      max_bathroom: 3,
      payment_method: 'payment',
      min_bedroom: 0,
    });
  });

  it('should ignore the default value', () => {
    expect(
      saveSearchFiltersMapper({
        [FiltersParametersEnum.furnishing]: '0' as FiltersValueFieldFurnishedType,
      } as FiltersValueInterface)
    ).toEqual({});
  });
});
