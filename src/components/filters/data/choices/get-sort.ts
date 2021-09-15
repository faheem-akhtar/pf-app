import { FiltersValueFieldSortChoiceType } from 'components/filters/value/field/sort-choice.type';
import { FiltersValueInterface } from 'components/filters/value/interface';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';

import { FiltersDataInterface } from '../interface';
import { filtersDataChoicesMakeGetChoices } from './make-get-choices';

const getSortChoices = filtersDataChoicesMakeGetChoices<FiltersValueFieldSortChoiceType>(FiltersParametersEnum.sort);

export const filtersDataChoicesGetSort = (
  value: FiltersValueInterface,
  data: FiltersDataInterface
): FiltersValueFieldSortChoiceType[] => {
  const allChoices = getSortChoices(value, data);

  if (value[FiltersParametersEnum.isDeveloperProperty]) {
    return allChoices;
  }

  return allChoices.filter((choice) => !['da', 'dd'].includes(choice.value));
};
