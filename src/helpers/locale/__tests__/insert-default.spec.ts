import { configCommon } from 'config/common';

import { localeInsertDefault } from '../insert-default';

describe('localeInsertDefault', () => {
  const { current, alternative } = configCommon.language;

  it('should return true for current locale', () => {
    expect(localeInsertDefault(current)).toBeTruthy();
  });

  it('should return true for alternative locale', () => {
    expect(localeInsertDefault(alternative)).toBeTruthy();
  });
});
