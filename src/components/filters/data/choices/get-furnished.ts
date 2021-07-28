import { filtersDataChoicesMakeGetChoices } from './make-get-choices';

import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersValueFieldFurnishedChoiceType } from 'components/filters/value/field/furnished-choice.type';

export const filtersDataChoicesGetFurnished = filtersDataChoicesMakeGetChoices<FiltersValueFieldFurnishedChoiceType>(
  FiltersParametersEnum.furnishing
);
