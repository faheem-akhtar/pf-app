import { useEffect, useState } from 'react';

import { FiltersDataInterface } from '../data/interface';
import { filtersValueEquals } from './equals';
import { filtersValueGetInitialStateForCategory } from './get-initial-state-for-category';
import { FiltersValueInterface } from './interface';
import { filtersValueProcessChange } from './process-change';

type ReturnType = {
  filtersValueIsDefault: boolean;
  filtersValue: FiltersValueInterface;
  changeFiltersValue: (newState: FiltersValueInterface) => FiltersValueInterface;
  setFiltersValue: (newState: FiltersValueInterface) => void;
  resetFiltersValue: () => FiltersValueInterface;
};

export const useFiltersValueState = (
  filtersData: FiltersDataInterface,
  initialState: FiltersValueInterface
): ReturnType => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (!filtersValueEquals(initialState, state, [])) {
      setState(initialState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialState]);

  const initialStateForCategory = filtersValueGetInitialStateForCategory(filtersData, state);

  return {
    /**
     * True if the value is same as default, ignoring sorting and page number
     */
    filtersValueIsDefault: filtersValueEquals(initialStateForCategory, state),

    /**
     * Filters value
     */
    filtersValue: state,

    /**
     * Change filters value
     * Resets other filters when category is being changed, but keeping the location
     */
    changeFiltersValue: (newState: FiltersValueInterface): FiltersValueInterface => {
      const nextState = filtersValueProcessChange(filtersData, state, newState);
      setState(nextState);
      return nextState;
    },

    /**
     * Set filters value without any preprocessing logic.
     */
    setFiltersValue: setState,

    /**
     * Reset filters value keeping the category
     */
    resetFiltersValue: (): FiltersValueInterface => {
      setState(initialStateForCategory);
      return initialStateForCategory;
    },
  };
};
