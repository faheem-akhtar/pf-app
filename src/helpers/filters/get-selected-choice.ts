import { FiltersValueFieldChoiceInterface } from 'components/filters/value/field/choice.interface';

/**
 * returns the choice stack which has the given value
 */
export const helpersFiltersGetSelectedChoice = <T, Choice extends FiltersValueFieldChoiceInterface<T>>(
  choices: Choice[],
  value: T
): Choice | undefined => choices.find((choice) => choice.value === value);
