import { FiltersValueFieldChoiceInterface } from 'components/filters/value/field/choice.interface';

/**
 * Filters all options ​​based on the value
 *
 * @param options Options to be displayed in the dropdown
 * @param value A current selected value
 * @param isMinimum Whether the comparison is based on the minimum value
 */
export function filtersToRangeOptions<V extends number | null>(
  options: FiltersValueFieldChoiceInterface<V>[],
  isMinimum: boolean,
  value?: number | null
): FiltersValueFieldChoiceInterface<V>[] {
  if (!value) {
    return options;
  }

  return options.filter((option) => {
    // checks if it is placeholder option or not
    if (option.value === null) {
      return true;
    }

    const numberOptionValue = Number(option.value);

    return isMinimum ? numberOptionValue <= value : numberOptionValue >= value;
  });
}
