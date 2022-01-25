import { MULTI_SELECTION_AUTOCOMPLETE_ALWAYS_VISIBLE_CHIPS_N_COUNT } from './always-visible-chips-n-count.constant';
import { MultiSelectionAutocompleteComputeInactiveRenderValuePropsInterface } from './compute-inactive-render-value-props.interface';
import { MultiSelectionAutocompleteInactiveRenderValueInterface } from './inactive-render-value.interface';

// TODO-FE[TPNX-2005] add test
/**
 * Compute value for the inactive state of autocomplete component
 * @param props
 */
export const multiSelectionAutocompleteComputeInactiveRenderValue = <T extends unknown>(
  props: MultiSelectionAutocompleteComputeInactiveRenderValuePropsInterface<T>
): Array<MultiSelectionAutocompleteInactiveRenderValueInterface<T>> => {
  const renderValue: Array<MultiSelectionAutocompleteInactiveRenderValueInterface<T>> = [];

  for (let i = 0; i < MULTI_SELECTION_AUTOCOMPLETE_ALWAYS_VISIBLE_CHIPS_N_COUNT; i++) {
    if (props.value[i]) {
      renderValue.push({ title: props.getChipTitle(props.value[i]), item: props.value[i] });
    }
  }

  if (props.value.length > MULTI_SELECTION_AUTOCOMPLETE_ALWAYS_VISIBLE_CHIPS_N_COUNT) {
    renderValue.push({
      title: props.t('multi-location-selector/n-more', {
        count: props.value.length - MULTI_SELECTION_AUTOCOMPLETE_ALWAYS_VISIBLE_CHIPS_N_COUNT,
      }),
      isMore: true,
    } as MultiSelectionAutocompleteInactiveRenderValueInterface<T>);
  }

  return renderValue;
};
