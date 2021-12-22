import { filtersChoicesSortStub } from 'stubs/filters/choices/sort.stub';
import { filtersDataStub } from 'stubs/filters/data.stub';
import { filtersValueStub } from 'stubs/filters/value/stub';

import { FiltersCategoryIdEnum } from 'enums/filters/category-id.enum';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';

import { filtersDataChoicesGetSort } from '../get-sort';

describe('filtersDataChoicesGetSort() Egypt', () => {
  it('should not include delivery date earliest and latest when isDeveloperProperty is not checked', () => {
    expect(
      filtersDataChoicesGetSort(
        filtersValueStub({ [FiltersParametersEnum.categoryId]: FiltersCategoryIdEnum.residentialForSale }),
        filtersDataStub()
      )
    ).toEqual(filtersChoicesSortStub());
  });

  it('should include delivery date earliest and latest when isDeveloperProperty is checked', () => {
    const choicesStub = [
      { value: 'da', label: 'Delivery date (earliest)', slug: ['delivery-date-(earliest)'] },
      { value: 'dd', label: 'Delivery date (latest)', slug: ['delivery-date-(latest)'] },
    ];

    expect(
      filtersDataChoicesGetSort(
        filtersValueStub({
          [FiltersParametersEnum.isDeveloperProperty]: true,
          [FiltersParametersEnum.categoryId]: FiltersCategoryIdEnum.residentialForSale,
        }),
        filtersDataStub()
      )
    ).toEqual(filtersChoicesSortStub(choicesStub));
  });
});
