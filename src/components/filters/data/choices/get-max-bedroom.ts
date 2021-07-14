import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersValueFieldMaxBedroomChoice } from 'components/filters/value/field/max-bedroom-choice';
import { filtersDataMakeGetChoices } from './make-get-choices';

export const filtersDataChoicesGetMaxBedroom = filtersDataMakeGetChoices<FiltersValueFieldMaxBedroomChoice>(
  FiltersParametersEnum.maxBedroom
);
