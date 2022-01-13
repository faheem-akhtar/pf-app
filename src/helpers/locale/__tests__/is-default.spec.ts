import { localeIsDefault } from 'helpers/locale/is-default';

describe('localeIsDefault()', () => {
  it('should return true', () => {
    expect(localeIsDefault('en')).toBeTruthy();
  });

  it('should return false', () => {
    expect(localeIsDefault('ar')).toBeFalsy();
  });
});
