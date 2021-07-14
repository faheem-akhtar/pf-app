import { FiltersDataInterface } from '../interface';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersValueBaseInterface } from 'components/filters/value/base-interface';
import { FiltersValueFieldChoiceInterface } from 'components/filters/value/field/choice.interface';
import { filtersDataMakeChoicesIndexesKey } from '../make-choices-indexes-key';

export const filtersDataMakeGetChoices =
  <Choice extends FiltersValueFieldChoiceInterface<string>>(filterType: FiltersParametersEnum) =>
  (value: FiltersValueBaseInterface, data: FiltersDataInterface): Choice[] =>
    data.choicesIndexes[filtersDataMakeChoicesIndexesKey(value, filterType)].map(
      (index) => data.allChoices[filterType][index]
    ) as Choice[];
