import { filtersDataChoicesMakeGetChoices } from './make-get-choices';

import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersValueFieldChoiceInterface } from 'components/filters/value/field/choice.interface';

export const filtersDataChoicesGetMinArea = filtersDataChoicesMakeGetChoices<FiltersValueFieldChoiceInterface<number>>(
  FiltersParametersEnum.minArea
);
