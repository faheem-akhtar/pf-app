import { SaveSearchFiltersInterface } from 'components/save-search/filters.interface';
import { SaveSearchFrequencyEnum } from 'enums/save-search/frequency.enum';

export interface ApiSaveSearchCreateRequestInterface {
  name: string;
  frequency: SaveSearchFrequencyEnum;
  filters: SaveSearchFiltersInterface;
}
