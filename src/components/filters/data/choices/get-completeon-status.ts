import { FiltersValueFieldCompletionStatusChoiceType } from 'components/filters/value/field/completion-status-choice.type';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';

import { filtersDataChoicesMakeGetChoices } from './make-get-choices';

export const filtersDataChoicesGetCompleteonStatus =
  filtersDataChoicesMakeGetChoices<FiltersValueFieldCompletionStatusChoiceType>(FiltersParametersEnum.completionStatus);
