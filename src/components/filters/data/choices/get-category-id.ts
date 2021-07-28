import { filtersDataChoicesMakeGetChoices } from './make-get-choices';

import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersValueFieldCategoryIdChoiceType } from 'components/filters/value/field/category-id-choice.type';

export const filtersDataChoicesGetCategoryId = filtersDataChoicesMakeGetChoices<FiltersValueFieldCategoryIdChoiceType>(
  FiltersParametersEnum.categoryId
);
