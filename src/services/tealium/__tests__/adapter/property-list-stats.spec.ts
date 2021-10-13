import { filtersValueStub } from 'stubs/filters/value/stub';
import { locationCompactJltStub, locationCompactKcStub } from 'stubs/location';
import { locationCompactMeydanStub } from 'stubs/location/compact-meydan.stub';
import { locationCompactSeasonsStub } from 'stubs/location/compact-seasons.stub';
import { propertyStub } from 'stubs/property/stub';

import { FiltersValueFieldCategoryIdType } from 'components/filters/value/field/category-id.type';
import { FiltersValueFieldPricePeriodType } from 'components/filters/value/field/price-period.type';
import { propertySerpObfuscatedFieldLocationTreeCompact } from 'components/property/serp/obfuscated/field/location-tree-compact';
import { PropertySerpObfuscatedType } from 'components/property/serp/obfuscated/type';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { tealiumAdapterPropertyListStats } from 'services/tealium/adapter/property-list-stats';

describe('tealiumAdapterPropertyListStats', () => {
  let properties: PropertySerpObfuscatedType[];
  const filters = filtersValueStub();
  const propertyCount = 3;

  beforeEach(() => {
    properties = new Array(propertyCount).fill(propertyStub());
  });

  test('if the transformed data have the same length of the given properties', () => {
    const propertiesStats = tealiumAdapterPropertyListStats(properties, filters);
    expect(Object.values(propertiesStats).every((value) => value.length === propertyCount)).toBe(true);
  });

  test('if transformed location types have the same location values that properties have', () => {
    const propertiesStats = tealiumAdapterPropertyListStats(properties, filters);
    expect(propertiesStats.properties_location_city.every((location) => location === locationCompactKcStub.name));
    expect(
      propertiesStats.properties_location_community.every((location) => location === locationCompactMeydanStub.name)
    );
    expect(
      propertiesStats.properties_location_sub_community.every(
        (location) => location === locationCompactSeasonsStub.name
      )
    );
    expect(propertiesStats.properties_location_tower.every((location) => location === locationCompactJltStub.name));
  });

  it('should set empty string for property_rental_period for empty price-period', () => {
    expect(
      tealiumAdapterPropertyListStats(properties, {
        ...filters,
        [FiltersParametersEnum.pricePeriod]: '' as FiltersValueFieldPricePeriodType,
      }).properties_rental_period.every((rental) => rental === '')
    );

    expect(
      tealiumAdapterPropertyListStats(properties, {
        ...filters,
        [FiltersParametersEnum.categoryId]: '3' as FiltersValueFieldCategoryIdType,
      }).properties_rental_period.every((rental) => rental === '')
    );
  });

  test('if location related values have empty string as default values', () => {
    properties = new Array(propertyCount).fill({
      ...properties,
      [propertySerpObfuscatedFieldLocationTreeCompact]: [],
    });

    const propertiesStats = tealiumAdapterPropertyListStats(properties, filters);

    expect(propertiesStats.properties_location0_id.every((id) => id === '')).toBe(true);
    expect(propertiesStats.properties_location1_id.every((id) => id === '')).toBe(true);
    expect(propertiesStats.properties_location2_id.every((id) => id === '')).toBe(true);
    expect(propertiesStats.properties_location3_id.every((id) => id === '')).toBe(true);
    expect(propertiesStats.properties_location4_id.every((id) => id === '')).toBe(true);
  });
});
