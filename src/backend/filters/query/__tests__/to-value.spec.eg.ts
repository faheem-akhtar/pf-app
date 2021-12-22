import { filtersValueStub } from 'stubs/filters/value/stub';

import { FiltersQueryInterface } from 'components/filters/query/interface';
import { FiltersValueFieldMaxBedroomType } from 'components/filters/value/field/max-bedroom.type';
import { FiltersValueFieldMinBedroomType } from 'components/filters/value/field/min-bedroom.type';
import { FiltersValueFieldPricePeriodType } from 'components/filters/value/field/price-period.type';
import { configCommon } from 'config/common';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';

import { backendFiltersQueryToValue } from '../to-value';

describe('backendFiltersQueryToValue() Egypt', () => {
  it('should get default values correctly', () => {
    expect(
      backendFiltersQueryToValue(
        { c: '2', bf: '4', bt: '4', pattern: '/categorySlug/propertyTypeSlug-saleType.html' } as FiltersQueryInterface,
        configCommon.language.current
      )
    ).toEqual(
      filtersValueStub({
        [FiltersParametersEnum.pricePeriod]: 'm' as FiltersValueFieldPricePeriodType,
        [FiltersParametersEnum.minBedroom]: '4' as FiltersValueFieldMinBedroomType,
        [FiltersParametersEnum.maxBedroom]: '4' as FiltersValueFieldMaxBedroomType,
      })
    );
  });
});
