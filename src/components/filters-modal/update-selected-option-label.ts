import { FiltersValueFieldChoiceInterface } from 'components/filters/value/field/choice.interface';
import { stringRemoveParentheses } from 'helpers/string/remove-parentheses';

/**
 * @param options Options to be displayed in the dropdown
 * @param selectedValue A current selected value
 * @param cb A function to be used on label transformation
 */
export const filtersModalUpdateSelectedOptionLabel = (
  options: FiltersValueFieldChoiceInterface<number | null>[],
  selectedValue?: number | null,
  cb: Function = stringRemoveParentheses
): FiltersValueFieldChoiceInterface<number | null>[] => {
  if (!selectedValue) {
    return options;
  }

  const selectedOption = options.find((option) => option.value === selectedValue);
  if (!selectedOption) {
    return options;
  }

  return options.map((option) => {
    if (option === selectedOption) {
      option.label = cb(selectedOption.label);
    }

    return option;
  });
};
