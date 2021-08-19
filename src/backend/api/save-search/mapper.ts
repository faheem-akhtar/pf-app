import { BackendModelSaveSearchInterface } from 'backend/model/save-search/interface';
import { SaveSearchLoadResultInterface } from 'components/save-search/load-result-interface';

export const backendApiSaveSearchMapper = (
  savedSearches: BackendModelSaveSearchInterface[]
): SaveSearchLoadResultInterface[] => {
  return savedSearches.map(({ id, name, frequency, filters, formatted_filters }) => ({
    id,
    name,
    frequency,
    filters,
    formatted_filters,
  }));
};
