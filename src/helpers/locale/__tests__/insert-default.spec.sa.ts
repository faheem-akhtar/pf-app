import { configCommon } from 'config/common';

import { localeInsertDefault } from '../insert-default';

describe('localeInsertDefault Saudi', () => {
  const { current, alternative } = configCommon.language;

  it('should return false for current locale', () => {
    expect(localeInsertDefault(current)).toBeFalsy();
  });

  it('should return true for alternative locale', () => {
    expect(localeInsertDefault(alternative)).toBeTruthy();
  });
});
