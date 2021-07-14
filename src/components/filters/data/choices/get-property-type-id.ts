import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersValueFieldPropertyTypeIdChoice } from 'components/filters/value/field/property-type-id-choice';
import { filtersDataMakeGetChoices } from './make-get-choices';

export const filtersDataChoicesGetPropertyTypeId = filtersDataMakeGetChoices<FiltersValueFieldPropertyTypeIdChoice>(
  FiltersParametersEnum.propertyTypeId
);
