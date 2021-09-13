import { objectCompare } from 'helpers/object/compare';
import { objectReduce } from 'helpers/object/reduce';

import { SaveSearchFiltersInterface } from './filters.interface';

function stringValuesToLowerCase<T extends Partial<SaveSearchFiltersInterface>>(filters: T): T {
  return objectReduce(
    filters,
    (acc, key, value) => ({ ...acc, [key]: typeof value === 'string' ? value.toLowerCase() : value }),
    {} as T
  );
}

export function saveSearchFilterEquality(
  filters1: Partial<SaveSearchFiltersInterface>,
  filters2: Partial<SaveSearchFiltersInterface>
): boolean {
  return objectCompare(stringValuesToLowerCase(filters1), stringValuesToLowerCase(filters2));
}
