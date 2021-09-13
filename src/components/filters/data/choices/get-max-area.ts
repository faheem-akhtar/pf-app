import { FiltersValueFieldChoiceInterface } from 'components/filters/value/field/choice.interface';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';

import { filtersDataChoicesMakeGetChoices } from './make-get-choices';

export const filtersDataChoicesGetMaxArea = filtersDataChoicesMakeGetChoices<FiltersValueFieldChoiceInterface<number>>(
  FiltersParametersEnum.maxArea
);
