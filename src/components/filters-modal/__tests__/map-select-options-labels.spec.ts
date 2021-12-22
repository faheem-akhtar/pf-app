import { filtersModalMapSelectOptionsLabels } from '../map-select-options-labels';

describe('filtersModalMapSelectOptionsLabels ', () => {
  it('should return exact options', () => {
    const options = [
      { value: 1, label: '1 year (12 installments)' },
      { value: 2, label: '2 years (24 installments)' },
      { value: 3, label: '3 years (36 installments)' },
      { value: 4, label: '4 years (48 installments)' },
    ];

    expect(filtersModalMapSelectOptionsLabels([{ value: null, label: '' }, ...options], 'From', true)).toEqual([
      { value: null, label: 'From' },
      ...options,
    ]);
  });

  it('should return option labels same as values', () => {
    const options = [
      { value: 1000, label: '1,000' },
      { value: 2000, label: '2,000' },
      { value: 3000, label: '3,000' },
      { value: 4000, label: '4,000' },
    ];

    expect(filtersModalMapSelectOptionsLabels([{ value: null, label: '' }, ...options], 'From')).toEqual([
      { value: null, label: 'From' },
      ...options,
    ]);
  });
});
