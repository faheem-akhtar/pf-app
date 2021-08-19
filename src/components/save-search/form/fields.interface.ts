import { BackendModelSaveSearchInterface } from 'backend/model/save-search/interface';

export interface SaveSearchFormFieldsInterface
  extends Pick<BackendModelSaveSearchInterface, 'id' | 'name' | 'frequency' | 'formatted_filters'> {}
