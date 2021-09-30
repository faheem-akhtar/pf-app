import { SaveSearchFiltersInterface } from 'components/save-search/filters.interface';
import { SaveSearchPayloadFilterKeysEnum } from 'enums/save-search/payload-filter-keys.enum';

export const saveSearchFiltersStub = (data: Partial<SaveSearchFiltersInterface> = {}): SaveSearchFiltersInterface => {
  return {
    [SaveSearchPayloadFilterKeysEnum.CATEGORY_ID]: 1,
    ...data,
  };
};
