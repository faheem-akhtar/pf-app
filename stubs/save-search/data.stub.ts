import { SaveSearchLoadResultInterface } from 'components/save-search/load-result-interface';
import { SaveSearchFrequencyEnum } from 'enums/save-search/frequency.enum';

import { saveSearchFiltersStub } from './filters.stub';

export const saveSearchDataStub = (
  data: Partial<SaveSearchLoadResultInterface> = {}
): SaveSearchLoadResultInterface => {
  return {
    id: '1',
    name: 'mocked save search name',
    frequency: SaveSearchFrequencyEnum.DAILY,
    filters: saveSearchFiltersStub(),
    formatted_filters: 'mocked formatted filters',
    ...data,
  };
};
