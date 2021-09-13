import { FiltersValueFieldAmenitiesChoiceType } from 'components/filters/value/field/amenities-choice.type';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';

import { filtersDataChoicesMakeGetChoices } from './make-get-choices';

export const filtersDataChoicesGetAmenities = filtersDataChoicesMakeGetChoices<FiltersValueFieldAmenitiesChoiceType>(
  FiltersParametersEnum.amenities
);
