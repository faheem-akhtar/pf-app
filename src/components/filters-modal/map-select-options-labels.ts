import { FiltersValueFieldChoiceInterface } from 'components/filters/value/field/choice.interface';
import { numberFormat } from 'helpers/number/format';

/**
 * @param options Options to be displayed in the dropdown
 * @param nullLabel The placeholder for nullable value
 * @param isComparable Whether both the value and label are the same or not
 */
export const filtersModalMapSelectOptionsLabels = (
  options: FiltersValueFieldChoiceInterface<number | null>[],
  nullLabel: string,
  isComparable: boolean = false
): FiltersValueFieldChoiceInterface<number | null>[] =>
  options.map((option) => ({
    value: option.value,
    label: option.value ? (isComparable ? option.label : numberFormat(option.value)) : nullLabel,
  }));
