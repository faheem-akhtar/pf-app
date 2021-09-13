import { FiltersValueFieldChoiceInterface } from 'components/filters/value/field/choice.interface';

/**
 * Filters all options ​​based on the value
 *
 * @param options The list of available options
 * @param value A value to compare against options
 * @param isMinimum Whether the value is minimum or maximum
 */
export function filtersToRangeOptions<V extends number | null>(
  options: FiltersValueFieldChoiceInterface<V>[],
  value: number | null,
  isMinimum: boolean
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
