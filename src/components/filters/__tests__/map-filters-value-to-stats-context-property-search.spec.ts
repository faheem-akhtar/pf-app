import { filtersValueAllSetStub } from 'stubs/filters/value/all-set-stub';
import { filtersValueStub } from 'stubs/filters/value/stub';

import { filtersMapFiltersValueToStatsContextPropertySearch } from '../map-filters-value-to-stats-context-property-search';

describe('filtersMapFiltersValueToStatsContextPropertySearch', () => {
  it('should handle minumum filters value object', () => {
    const result = filtersMapFiltersValueToStatsContextPropertySearch(filtersValueStub());

    expect(result).toEqual({
      amenities: [],
      category: 2,
      locations: [],
      rental_period: 'y',
      sort: 'mr',
      is_developer_property: false,
    });
  });

  it('should handle empty input', () => {
    const result = filtersMapFiltersValueToStatsContextPropertySearch(filtersValueAllSetStub());

    expect(result).toEqual({
      amenities: ['BB', 'RR'],
      area_max: 700,
      area_min: 500,
      bathroom_max: 5,
      bathroom_min: 2,
      bedroom_max: 4,
      bedroom_min: 3,
      category: 1,
      keywords: 'beach,pool',
      locations: [280, 943],
      payment_method: 'cash',
      price_max: 50000,
      price_min: 5000,
      property_type_id: 2,
      rental_period: 'y',
      sort: 'mr',
      utilities_price_type: 'included',
      virtual_viewings: '360',
      is_developer_property: true,
      max_installment_years: 10,
      min_installment_years: 5,
      completion_status: 'completed',
    });
  });
});
