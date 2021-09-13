import { validationPhone } from 'helpers/validation/phone';

describe('validationPhone', () => {
  const message: string = 'error message';

  it('should return an error message', () => {
    expect(validationPhone(message)('+97155555555123154')).toBe(message);
  });

  it('should return an empty string', () => {
    expect(validationPhone(message)('+97155555555')).toBe('');
  });
});
