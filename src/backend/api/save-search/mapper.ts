import { BackendModelSaveSearchInterface } from 'backend/model/save-search/interface';
import { SaveSearchInterface } from 'components/save-search/interface';

export const backendApiSaveSearchMapper = (
  data: BackendModelSaveSearchInterface | BackendModelSaveSearchInterface[]
): SaveSearchInterface[] => {
  const savedSearches = Array.isArray(data) ? data : data ? [data] : [];

  return savedSearches.map(({ id, name, frequency, filters, formatted_filters }) => ({
    id,
    name,
    frequency,
    filters,
    formattedFilters: formatted_filters,
  }));
};
