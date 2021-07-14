import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersValueFieldCategoryIdChoice } from 'components/filters/value/field/category-id-choice';
import { filtersDataMakeGetChoices } from './make-get-choices';

export const filtersDataChoicesGetCategoryId = filtersDataMakeGetChoices<FiltersValueFieldCategoryIdChoice>(
  FiltersParametersEnum.categoryId
);
