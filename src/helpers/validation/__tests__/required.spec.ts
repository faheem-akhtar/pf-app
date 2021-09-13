import { validationRequired } from 'helpers/validation/required';

describe('validationRequired', () => {
  const message: string = 'error message';

  it('should return an error message', () => {
    expect(validationRequired(message)(null)).toBe(message);
  });

  it('should return an empty string', () => {
    expect(validationRequired(message)('text')).toBe('');
  });
});
