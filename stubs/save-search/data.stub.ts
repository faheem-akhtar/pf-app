import { SaveSearchInterface } from 'components/save-search/interface';
import { SaveSearchFrequencyEnum } from 'enums/save-search/frequency.enum';

import { saveSearchFiltersStub } from './filters.stub';

export const saveSearchDataStub = (data: Partial<SaveSearchInterface> = {}): SaveSearchInterface => {
  return {
    id: '1',
    name: 'mocked save search name',
    frequency: SaveSearchFrequencyEnum.DAILY,
    filters: saveSearchFiltersStub(),
    formattedFilters: 'mocked formatted filters',
    ...data,
  };
};
