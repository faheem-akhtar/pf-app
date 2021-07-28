import { configIsTrace } from 'config/is-trace';
import { filtersDataMakeChoicesIndexesKey } from '../make-choices-indexes-key';

import { FiltersDataInterface } from '../interface';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersValueBaseInterface } from 'components/filters/value/base-interface';
import { FiltersValueFieldChoiceInterface } from 'components/filters/value/field/choice.interface';

export const filtersDataChoicesMakeGetChoices =
  <Choice extends FiltersValueFieldChoiceInterface<string>>(filterType: FiltersParametersEnum) =>
  (value: FiltersValueBaseInterface, data: FiltersDataInterface): Choice[] => {
    const choicesIndexes = data.choicesIndexes[filtersDataMakeChoicesIndexesKey(value, filterType)] || [];

    if (configIsTrace && choicesIndexes.length === 0) {
      throw new Error(`Choices not found for ${filtersDataMakeChoicesIndexesKey(value, filterType)}`);
    }

    return choicesIndexes.map((index) => data.allChoices[filterType][index]) as Choice[];
  };
