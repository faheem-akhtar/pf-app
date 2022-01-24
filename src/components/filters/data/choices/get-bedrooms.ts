import { FiltersValueFieldBedroomsChoiceType } from 'components/filters/value/field/bedrooms-choice.type';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';

import { filtersDataChoicesMakeGetChoices } from './make-get-choices';

export const filtersDataChoicesGetBedrooms = filtersDataChoicesMakeGetChoices<FiltersValueFieldBedroomsChoiceType>(
  FiltersParametersEnum.bedrooms
);
