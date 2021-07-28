import { filtersDataChoicesMakeGetChoices } from './make-get-choices';

import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersValueFieldCompletionStatusChoiceType } from 'components/filters/value/field/completion-status-choice.type';

export const filtersDataChoicesGetCompleteonStatus =
  filtersDataChoicesMakeGetChoices<FiltersValueFieldCompletionStatusChoiceType>(FiltersParametersEnum.completionStatus);
