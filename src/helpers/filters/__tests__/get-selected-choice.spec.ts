import { helpersFiltersGetSelectedChoice } from '../get-selected-choice';

describe('helpersFiltersGetSelectedChoice()', () => {
  const choices = [{ value: 'value1', label: 'label1', slug: [] }];

  test('if correct stack is returned for the given value', () => {
    const choice = { value: 'value', label: 'label', slug: [] };
    expect(helpersFiltersGetSelectedChoice([...choices, choice], 'value')).toBe(choice);
  });

  test('if returns undefined for the not-exist value', () => {
    expect(helpersFiltersGetSelectedChoice(choices, 'value')).toBeUndefined();
  });
});
