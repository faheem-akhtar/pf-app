import { useState } from 'react';

import { filtersDataGetInitialState } from '../data/get-initial-state';
import { filtersValueEquals } from './equals';

import { FiltersDataInterface } from '../data/interface';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersValueInterface } from './interface';

const getInitialStateForCategory = (
  filtersData: FiltersDataInterface,
  state: FiltersValueInterface
): FiltersValueInterface => ({
  ...filtersDataGetInitialState(
    {
      [FiltersParametersEnum.categoryId]: state[FiltersParametersEnum.categoryId],
      [FiltersParametersEnum.propertyTypeId]: '',
    },
    filtersData
  ),
  [FiltersParametersEnum.locationsIds]: state[FiltersParametersEnum.locationsIds],
});

const processChange = (
  filtersData: FiltersDataInterface,
  prevFiltersValue: FiltersValueInterface,
  newFiltersValue: FiltersValueInterface
): FiltersValueInterface => {
  // If category changed - reset other filters except location
  if (prevFiltersValue[FiltersParametersEnum.categoryId] !== newFiltersValue[FiltersParametersEnum.categoryId]) {
    return getInitialStateForCategory(filtersData, newFiltersValue);
  }

  return newFiltersValue;
};

type ReturnType = {
  filtersValueIsDefault: boolean;
  filtersValue: FiltersValueInterface;
  changeFiltersValue: (newState: FiltersValueInterface) => FiltersValueInterface;
  setFiltersValue: (newState: FiltersValueInterface) => void;
  resetFiltersValue: () => FiltersValueInterface;
};

// TODO-FE[CX-411] Add tests
export const useFiltersValueState = (
  filtersData: FiltersDataInterface,
  initialState: FiltersValueInterface
): ReturnType => {
  const [state, setState] = useState(initialState);

  const initialStateForCategory = getInitialStateForCategory(filtersData, state);

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
      const nextState = processChange(filtersData, state, newState);
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
