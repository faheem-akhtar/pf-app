import { FiltersValueFieldBathroomsChoiceType } from 'components/filters/value/field/bathrooms-choice.type';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';

import { filtersDataChoicesMakeGetChoices } from './make-get-choices';

export const filtersDataChoicesGetBathrooms = filtersDataChoicesMakeGetChoices<FiltersValueFieldBathroomsChoiceType>(
  FiltersParametersEnum.bathrooms
);
