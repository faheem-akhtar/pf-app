import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersValueFieldVirtualViewingChoice } from 'components/filters/value/field/virtual-viewing-choice';
import { filtersDataMakeGetChoices } from './make-get-choices';

export const filtersDataChoicesGetVirtualViewing = filtersDataMakeGetChoices<FiltersValueFieldVirtualViewingChoice>(
  FiltersParametersEnum.virtualViewings
);
