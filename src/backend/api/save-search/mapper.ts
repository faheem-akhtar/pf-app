import { BackendModelSaveSearchInterface } from 'backend/model/save-search/interface';
import { SaveSearchLoadResultInterface } from 'components/save-search/load-result-interface';

export const backendApiSaveSearchMapper = (
  data: BackendModelSaveSearchInterface | BackendModelSaveSearchInterface[]
): SaveSearchLoadResultInterface[] => {
  const savedSearches = Array.isArray(data) ? data : data ? [data] : [];
  return savedSearches.map(({ id, name, frequency, filters, formatted_filters }) => ({
    id,
    name,
    frequency,
    filters,
    formatted_filters,
  }));
};
