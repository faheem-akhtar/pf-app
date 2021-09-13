import { FiltersValueFieldFurnishedChoiceType } from 'components/filters/value/field/furnished-choice.type';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';

import { filtersDataChoicesMakeGetChoices } from './make-get-choices';

export const filtersDataChoicesGetFurnished = filtersDataChoicesMakeGetChoices<FiltersValueFieldFurnishedChoiceType>(
  FiltersParametersEnum.furnishing
);
