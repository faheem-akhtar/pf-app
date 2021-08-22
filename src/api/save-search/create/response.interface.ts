import { SaveSearchFiltersInterface } from 'components/save-search/filters.interface';
import { SaveSearchFrequencyEnum } from 'enums/save-search/frequency.enum';

export interface ApiSaveSearchCreateResponseInterface {
  data: {
    id: string;
    type: 'saved_search';
    attributes: {
      name: string;
      frequency: SaveSearchFrequencyEnum;
      filters: SaveSearchFiltersInterface;
      formatted_filters: string;
    };
  };
}
