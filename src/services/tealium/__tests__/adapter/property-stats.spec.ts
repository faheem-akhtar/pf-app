import { filtersValueStub } from 'stubs/filters/value/stub';
import { propertyStub } from 'stubs/property/stub';

import { FiltersValueFieldCategoryIdType } from 'components/filters/value/field/category-id.type';
import { FiltersValueFieldPricePeriodType } from 'components/filters/value/field/price-period.type';
import { FiltersValueInterface } from 'components/filters/value/interface';
import { propertySerpObfuscatedFieldBathroomValue } from 'components/property/serp/obfuscated/field/bathroom-value';
import { propertySerpObfuscatedFieldCompletionStatus } from 'components/property/serp/obfuscated/field/completion-status';
import { propertySerpObfuscatedFieldLocationTreeCompact } from 'components/property/serp/obfuscated/field/location-tree-compact';
import { propertySerpObfuscatedGetId } from 'components/property/serp/obfuscated/get/id';
import { PropertySerpObfuscatedType } from 'components/property/serp/obfuscated/type';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { tealiumAdapterPropertyStats } from 'services/tealium/adapter/property-stats';

describe('tealiumAdapterPropertyStats', () => {
  let property: PropertySerpObfuscatedType;
  let filters: FiltersValueInterface;
  beforeEach(() => {
    property = propertyStub();
    filters = filtersValueStub();
  });

  test('if adapter returns correct values for the given property', () => {
    expect(Object.values(tealiumAdapterPropertyStats(property, filters)).every((value) => value !== '')).toBe(true);
  });

  test('if adapter returns default values for not-exist props', () => {
    property = {
      ...property,
      [propertySerpObfuscatedFieldCompletionStatus]: null,
      [propertySerpObfuscatedFieldLocationTreeCompact]: [],
      [propertySerpObfuscatedFieldBathroomValue]: '',
    };

    expect(tealiumAdapterPropertyStats(property, filters)).toEqual(
      expect.objectContaining({
        property_completion: '',
        property_location0_id: '',
        property_location1_id: '',
        property_location2_id: '',
        property_location3_id: '',
        property_location4_id: '',
        property_location_city: '',
        property_location_community: '',
        property_location_sub_community: '',
        property_location_tower: '',
        property_rental_period: 'y',
        property_bathrooms: '0',
      })
    );
  });

  test('if property_rental_period is empty for not-rent category', () => {
    expect(
      tealiumAdapterPropertyStats(property, {
        ...filters,
        [FiltersParametersEnum.categoryId]: '3' as FiltersValueFieldCategoryIdType,
      })
    ).toEqual(
      expect.objectContaining({
        property_rental_period: '',
      })
    );

    expect(
      tealiumAdapterPropertyStats(property, {
        ...filters,
        [FiltersParametersEnum.pricePeriod]: '' as FiltersValueFieldPricePeriodType,
      })
    ).toEqual(
      expect.objectContaining({
        property_rental_period: '',
      })
    );
  });

  test('if transactional_id is missing', () => {
    expect(tealiumAdapterPropertyStats(property, filters)).not.toEqual(
      expect.objectContaining({
        property_transaction_id: propertySerpObfuscatedGetId(property),
      })
    );
  });

  test('if transactional_id is exist', () => {
    expect(tealiumAdapterPropertyStats(property, filters, { isTransactionalEvent: true })).toEqual(
      expect.objectContaining({
        property_transaction_id: propertySerpObfuscatedGetId(property),
      })
    );
  });
});
