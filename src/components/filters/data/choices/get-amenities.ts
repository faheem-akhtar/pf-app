import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersValueFieldAmenitiesChoice } from 'components/filters/value/field/amenities-choice';
import { filtersDataMakeGetChoices } from './make-get-choices';

export const filtersDataChoicesGetAmenities = filtersDataMakeGetChoices<FiltersValueFieldAmenitiesChoice>(
  FiltersParametersEnum.amenities
);
