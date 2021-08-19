import { SaveSearchFrequencyEnum } from 'enums/save-search/frequency.enum';

export const saveSearchFrequencies: Array<{ label: string; value: SaveSearchFrequencyEnum }> = [
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
