import { SaveSearchFrequencyEnum } from 'enums/save-search/frequency.enum';

import { SaveSearchFiltersInterface } from './filters.interface';

export type SaveSearchLoadResultInterface = {
  /**
   * ID
   */
  id: string;

  /**
   * Name of the saved search
   */
  name: string;

  /**
   * Frequency to which email will be sent: Weekly | daily | off
   */
  frequency: SaveSearchFrequencyEnum;

  /**
   * Filters in use for the current saved search
   */
  filters: SaveSearchFiltersInterface;

  /**
   * Formatted name of the search according to selected filters
   */
  // tslint:disable-next-line
  formatted_filters: string;
};
