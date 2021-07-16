import { FiltersDataInterface } from './data/interface';
import { FiltersValueInterface } from './value/interface';

export interface FiltersContextInterface {
  /**
   * Change filters value using updater function
   * Will reset other filters on category change
   * @param updater will receive current version of filter and should return updated one
   * @returns filters value that has been set as new state
   */
  change: (updater: (value: FiltersValueInterface) => FiltersValueInterface) => FiltersValueInterface;
  /**
   * Set filters value dirrectly without any additional logic
   */
  set: (value: FiltersValueInterface) => void;
  /**
   * Reset filters using currently selected category
   */
  reset: () => void;
  /**
   * Filters data, used to get choices for filters, available filters and initial states
   */
  data: FiltersDataInterface;
  /**
   * Current filters value
   */
  value: FiltersValueInterface;
  /**
   * Is current value is same as default value for category, ignoring locations, page and sort
   */
  valueIsDefault: boolean;
}
