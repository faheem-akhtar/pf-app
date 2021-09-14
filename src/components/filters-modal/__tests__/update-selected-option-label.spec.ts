import { filtersModalUpdateSelectedOptionLabel } from '../update-selected-option-label';

const options = [
  { value: null, label: 'From' },
  { value: 1, label: '1 year (12 installments)' },
  { value: 2, label: '2 years (24 installments)' },
  { value: 3, label: '3 years (36 installments)' },
  { value: 4, label: '4 years (48 installments)' },
];

describe('filtersModalUpdateSelectedOptionLabel', () => {
  it('should not update label when value is not in the options', () => {
    expect(filtersModalUpdateSelectedOptionLabel(options, 6)).toEqual(options);
  });

  it('should not update label when the value is null', () => {
    expect(filtersModalUpdateSelectedOptionLabel(options, null)).toEqual(options);
  });

  it('should update label', () => {
    expect(filtersModalUpdateSelectedOptionLabel(options, 2)).toEqual(options);
  });
});
