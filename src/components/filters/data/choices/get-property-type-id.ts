import { FiltersValueFieldPropertyTypeIdChoiceType } from 'components/filters/value/field/property-type-id-choice.type';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';

import { filtersDataChoicesMakeGetChoices } from './make-get-choices';

export const filtersDataChoicesGetPropertyTypeId =
  filtersDataChoicesMakeGetChoices<FiltersValueFieldPropertyTypeIdChoiceType>(FiltersParametersEnum.propertyTypeId);
