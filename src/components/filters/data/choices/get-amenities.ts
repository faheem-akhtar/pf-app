import { filtersDataChoicesMakeGetChoices } from './make-get-choices';

import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersValueFieldAmenitiesChoiceType } from 'components/filters/value/field/amenities-choice.type';

export const filtersDataChoicesGetAmenities = filtersDataChoicesMakeGetChoices<FiltersValueFieldAmenitiesChoiceType>(
  FiltersParametersEnum.amenities
);
