import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersValueFieldMinBathroomChoice } from 'components/filters/value/field/min-bathroom-choice';
import { filtersDataMakeGetChoices } from './make-get-choices';

export const filtersDataChoicesGetMinBathroom = filtersDataMakeGetChoices<FiltersValueFieldMinBathroomChoice>(
  FiltersParametersEnum.minBathroom
);
