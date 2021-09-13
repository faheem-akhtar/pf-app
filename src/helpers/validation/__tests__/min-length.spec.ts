import { validationMinLength } from 'helpers/validation/min-length';

describe('validationMinLength', () => {
  const message: string = 'error message';
  const minLength: number = 6;

  it('should return an error message', () => {
    expect(validationMinLength(message, minLength)('1234')).toBe(message);
  });

  it('should return an empty string', () => {
    expect(validationMinLength(message, minLength)('pfwebapp')).toBe('');
  });
});
