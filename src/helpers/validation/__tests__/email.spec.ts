import { validationEmail } from 'helpers/validation/email';

describe('validationEmail', () => {
  const message: string = 'error message';

  it('should return an error message', () => {
    expect(validationEmail(message)('notCorrectEmailAddress')).toBe(message);
  });

  it('should return an empty string', () => {
    expect(validationEmail(message)('not@email.pl')).toBe('');
  });
});
