import { SaveSearchFrequencyEnum } from 'enums/save-search/frequency.enum';

export const SAVE_SEARCH_FREQUENCIES: Array<{ label: string; value: SaveSearchFrequencyEnum }> = [
  {
    label: 'off',
    value: SaveSearchFrequencyEnum.OFF,
  },
  {
    label: 'daily',
    value: SaveSearchFrequencyEnum.DAILY,
  },
  {
    label: 'weekly',
    value: SaveSearchFrequencyEnum.WEEKLY,
  },
];
