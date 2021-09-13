import { validationNumber } from 'helpers/validation/number';

describe('validationNumber', () => {
  const message: string = 'error message';

  it('should return an empty string', () => {
    expect(validationNumber(message)(3)).toBe('');
  });

  it('should return an error message', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(validationNumber(message)(<any>'2s')).toBe(message);
  });
});
