import { FiltersContextInterface } from 'components/filters/context.interface';
import { filtersDataGetInitialState } from 'components/filters/data/get-initial-state';
import { FiltersValueInterface } from 'components/filters/value/interface';

/**
 * @param fields FiltersParametersEnum[]
 * @returns a function that calculates the count of updated filter fields
 */
export const FiltersCountFactory =
  (fields: Array<Array<keyof FiltersValueInterface>>) =>
  ({ value, data }: Pick<FiltersContextInterface, 'value' | 'data'>): number => {
    let filterCount = 0;
    const initialFilterState = filtersDataGetInitialState(value, data);

    for (const field of fields) {
      const isFieldUpdated = field.some((key) => {
        if (Array.isArray(value[key])) {
          const updatedValues = value[key] as string[];
          return (
            !!updatedValues.length &&
            updatedValues.every((value, index) => value === (initialFilterState[key] as string[])[index])
          );
        } else {
          return value[key] && initialFilterState[key] !== value[key];
        }
      });
      if (isFieldUpdated) {
        filterCount++;
      }
    }
    return filterCount;
  };
