import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersValueFieldCompletionStatusChoice } from 'components/filters/value/field/completion-status-choice';
import { filtersDataMakeGetChoices } from './make-get-choices';

export const filtersDataChoicesGetCompletionStatus = filtersDataMakeGetChoices<FiltersValueFieldCompletionStatusChoice>(
  FiltersParametersEnum.completionStatus
);
