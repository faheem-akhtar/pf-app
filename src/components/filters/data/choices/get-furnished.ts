import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersValueFieldFurnishedChoice } from 'components/filters/value/field/furnished-choice';
import { filtersDataMakeGetChoices } from './make-get-choices';

export const filtersDataChoicesGetFurnished = filtersDataMakeGetChoices<FiltersValueFieldFurnishedChoice>(
  FiltersParametersEnum.furnishing
);
