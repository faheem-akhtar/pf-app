import { filtersDataChoicesMakeGetChoices } from './make-get-choices';

import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersValueFieldVirtualViewingChoiceType } from 'components/filters/value/field/virtual-viewing-choice.type';

export const filtersDataChoicesGetVirtualViewing =
  filtersDataChoicesMakeGetChoices<FiltersValueFieldVirtualViewingChoiceType>(FiltersParametersEnum.virtualViewings);
