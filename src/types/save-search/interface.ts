import { SaveSearchFiltersInterface } from 'components/save-search/filters.interface';

export interface SaveSearchInterface {
  type: 'saved_search';
  id: string;
  attributes: {
    name: string;
    frequency: string;
    formatted_filters: string;
    filters: SaveSearchFiltersInterface;
  };
}
