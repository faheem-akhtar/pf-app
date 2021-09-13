import { FiltersValueFieldVirtualViewingChoiceType } from 'components/filters/value/field/virtual-viewing-choice.type';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';

import { filtersDataChoicesMakeGetChoices } from './make-get-choices';

export const filtersDataChoicesGetVirtualViewing =
  filtersDataChoicesMakeGetChoices<FiltersValueFieldVirtualViewingChoiceType>(FiltersParametersEnum.virtualViewings);
