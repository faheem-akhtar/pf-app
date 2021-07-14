import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersValueFieldMinBedroomChoice } from 'components/filters/value/field/min-bedroom-choice';
import { filtersDataMakeGetChoices } from './make-get-choices';

export const filtersDataChoicesGetMinBedroom = filtersDataMakeGetChoices<FiltersValueFieldMinBedroomChoice>(
  FiltersParametersEnum.minBedroom
);
