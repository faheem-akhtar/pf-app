import { FiltersValueFieldChoiceInterface } from 'components/filters/value/field/choice.interface';

/**
 * Filters all options ​​based on the value
 *
 * @param options FiltersValueFieldChoiceInterface<V>[]
 * @param value number | null
 * @param isMinimum boolean
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
