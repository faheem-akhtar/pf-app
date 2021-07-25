import { MultiSelectionAutocompleteComputeInactiveRenderValuePropsInterface } from './compute-inactive-render-value-props.interface';
import { MultiSelectionAutocompleteInactiveRenderValueInterface } from './inactive-render-value.interface';

const alwaysVisibleChipsN = 1;

// TODO-FE[TPNX-2005] add test
/**
 * Compute value for the inactive state of autocomplete component
 * @param props
 */
export const multiSelectionAutocompleteComputeInactiveRenderValue = <T extends unknown>(
  props: MultiSelectionAutocompleteComputeInactiveRenderValuePropsInterface<T>
): Array<MultiSelectionAutocompleteInactiveRenderValueInterface<T>> => {
  const renderValue: Array<MultiSelectionAutocompleteInactiveRenderValueInterface<T>> = [];

  for (let i = 0; i < alwaysVisibleChipsN; i++) {
    if (props.value[i]) {
      renderValue.push({ title: props.getChipTitle(props.value[i]), item: props.value[i] });
    }
  }

  if (props.value.length > alwaysVisibleChipsN) {
    renderValue.push({
      title: props.t('{N} more').replace('{N}', String(props.value.length - alwaysVisibleChipsN)),
      isMore: true,
    } as MultiSelectionAutocompleteInactiveRenderValueInterface<T>);
  }

  return renderValue;
};
