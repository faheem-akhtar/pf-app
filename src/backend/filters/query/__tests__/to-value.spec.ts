import { filtersValueStub } from 'stubs/filters/value/stub';

import { FiltersQueryInterface } from 'components/filters/query/interface';
import { configCommon } from 'config/common';

import { backendFiltersQueryToValue } from '../to-value';

describe('backendFiltersQueryToValue()', () => {
  it('should matched query params correctly to FiltersValueInterface and returns default values if exist', () => {
    expect(
      backendFiltersQueryToValue(
        { c: '2', pattern: '/categorySlug/propertyTypeSlug-saleType.html' } as FiltersQueryInterface,
        configCommon.language.current
      )
    ).toEqual(filtersValueStub());
  });
});
