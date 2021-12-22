import { FiltersValueFieldChoiceInterface } from 'components/filters/value/field/choice.interface';
import { filtersToRangeOptions } from 'helpers/filters/to-range-options';

describe('filtersToRangeOptions', () => {
  let options: FiltersValueFieldChoiceInterface<number | null>[];

  beforeAll(() => {
    options = [
      { value: null, label: 'From' },
      { value: 20000, label: '20,000' },
      { value: 30000, label: '30,000' },
      { value: 40000, label: '40,000' },
      { value: 50000, label: '50,000' },
      { value: 60000, label: '60,000' },
      { value: 1000000, label: '1,000,000' },
    ];
  });

  it('should return values less than or equal to 60000', () => {
    expect(filtersToRangeOptions(options, true, 60000)).toEqual([
      { value: null, label: 'From' },
      { value: 20000, label: '20,000' },
      { value: 30000, label: '30,000' },
      { value: 40000, label: '40,000' },
      { value: 50000, label: '50,000' },
      { value: 60000, label: '60,000' },
    ]);
  });

  it('should return values higher than or equal to 30000', () => {
    expect(filtersToRangeOptions(options, false, 30000)).toEqual([
      { value: null, label: 'From' },
      { value: 30000, label: '30,000' },
      { value: 40000, label: '40,000' },
      { value: 50000, label: '50,000' },
      { value: 60000, label: '60,000' },
      { value: 1000000, label: '1,000,000' },
    ]);
  });

  it('should return exact values when the value is null', () => {
    expect(filtersToRangeOptions(options, false, null)).toEqual(options);
  });
});
