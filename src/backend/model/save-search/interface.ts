import { BackendJsonApiModelType } from 'backend/json-api/model.type';
import { SaveSearchFiltersInterface } from 'components/save-search/filters.interface';
import { SaveSearchFrequencyEnum } from 'enums/save-search/frequency.enum';

export interface BackendModelSaveSearchInterface extends BackendJsonApiModelType {
  id: string;
  name: string;
  frequency: SaveSearchFrequencyEnum;
  filters: SaveSearchFiltersInterface;
  formatted_filters: string;
}
