import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersValueFieldMaxBathroomChoice } from 'components/filters/value/field/max-bathroom-choice';
import { filtersDataMakeGetChoices } from './make-get-choices';

export const filtersDataChoicesGetMaxBathroom = filtersDataMakeGetChoices<FiltersValueFieldMaxBathroomChoice>(
  FiltersParametersEnum.maxBathroom
);
