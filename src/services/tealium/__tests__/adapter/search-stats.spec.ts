import { filtersDataStub } from 'stubs/filters/data.stub';
import { filtersValueStub } from 'stubs/filters/value/stub';
import { locationCompactJltStub, locationCompactKcStub } from 'stubs/location';

import { FiltersValueFieldBedroomsType } from 'components/filters/value/field/bedrooms.type';
import { FiltersValueFieldCategoryIdType } from 'components/filters/value/field/category-id.type';
import { FiltersValueFieldFurnishedType } from 'components/filters/value/field/furnished.type';
import { FiltersValueFieldPropertyTypeIdType } from 'components/filters/value/field/property-type-id.type';
import { FiltersValueFieldVirtualViewingType } from 'components/filters/value/field/virtual-viewing.type';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { tealiumAdapterSearchStats } from 'services/tealium/adapter/search-stats';
import { LocationCompactInterface } from 'types/location/compact.interface';

describe('tealiumAdapterSearchStats()', () => {
  const baseFilters = filtersValueStub();
  const filtersData = filtersDataStub();

  it('should transform all the given parameters', () => {
    const filters = {
      ...baseFilters,
      [FiltersParametersEnum.propertyTypeId]: '1' as FiltersValueFieldPropertyTypeIdType,
      [FiltersParametersEnum.furnishing]: '2' as FiltersValueFieldFurnishedType,
      [FiltersParametersEnum.keyword]: 'lorem',
      [FiltersParametersEnum.maxArea]: 123,
      [FiltersParametersEnum.minArea]: 122,
      [FiltersParametersEnum.maxPrice]: 122,
      [FiltersParametersEnum.minPrice]: 121,
      [FiltersParametersEnum.bedrooms]: [
        '1' as FiltersValueFieldBedroomsType,
        '2' as FiltersValueFieldBedroomsType,
        '3' as FiltersValueFieldBedroomsType,
      ],
      [FiltersParametersEnum.virtualViewings]: '360' as FiltersValueFieldVirtualViewingType,
      [FiltersParametersEnum.locationsIds]: [
        locationCompactKcStub,
        locationCompactJltStub,
      ] as LocationCompactInterface[],
    };

    expect(tealiumAdapterSearchStats(filters, filtersData)).toEqual(
      expect.objectContaining({
        search_category: 'rent',
        search_property_type: 'Apartment',
        search_locations: [locationCompactKcStub.name, locationCompactJltStub.name],
        search_furnishing: 'Unfurnished',
        search_rental_period: 'Yearly',
        search_keywords: 'lorem',
        search_max_area: '123',
        search_min_area: '122',
        search_max_price: '122',
        search_min_price: '121',
        search_bedrooms: ['1', '2', '3'],
        search_viewings_type: '360',
      })
    );
  });

  it('should pass default values for not-active filters', () => {
    const filters = {
      ...baseFilters,
      [FiltersParametersEnum.categoryId]: '3' as FiltersValueFieldCategoryIdType,
    };

    expect(tealiumAdapterSearchStats(filters, filtersData)).toEqual(
      expect.objectContaining({
        search_category: 'commercial_buy',
        search_property_type: '',
        search_locations: [],
        search_furnishing: '',
        search_rental_period: '',
        search_keywords: '',
        search_bedrooms: [],
        search_bathrooms: [],
        search_max_area: '',
        search_min_area: '',
        search_max_price: '',
        search_min_price: '',
        search_viewings_type: '',
      })
    );
  });
});
