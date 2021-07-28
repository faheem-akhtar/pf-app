import { filtersDataChoicesMakeGetChoices } from './make-get-choices';

import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersValueFieldPropertyTypeIdChoiceType } from 'components/filters/value/field/property-type-id-choice.type';

export const filtersDataChoicesGetPropertyTypeId =
  filtersDataChoicesMakeGetChoices<FiltersValueFieldPropertyTypeIdChoiceType>(FiltersParametersEnum.propertyTypeId);
