import { FiltersValueFieldCategoryIdChoiceType } from 'components/filters/value/field/category-id-choice.type';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';

import { filtersDataChoicesMakeGetChoices } from './make-get-choices';

export const filtersDataChoicesGetCategoryId = filtersDataChoicesMakeGetChoices<FiltersValueFieldCategoryIdChoiceType>(
  FiltersParametersEnum.categoryId
);
