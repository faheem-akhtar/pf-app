import { FiltersValueFieldChoiceInterface } from 'components/filters/value/field/choice.interface';
import { numberFormat } from 'helpers/number/format';

export const filtersModalMapSelectOptionsLabels = (
  options: FiltersValueFieldChoiceInterface<number | null>[],
  nullLabel: string
): FiltersValueFieldChoiceInterface<number | null>[] => {
  return options.map((option) => ({
    value: option.value,
    label: option.value ? numberFormat(option.value) : nullLabel,
  }));
};
