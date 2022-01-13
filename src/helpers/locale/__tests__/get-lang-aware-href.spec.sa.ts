import { configCommon } from 'config/common';
import { configOriginValue } from 'config/origin/value';
import { localeGetLangAwareHref } from 'helpers/locale/get-lang-aware-href';

describe('localeGetLangAwareHref', () => {
  const { current, alternative } = configCommon.language;
  let path: string;

  beforeEach(() => {
    path = '/search?l=104&c=2&fu=0&rp=y&ob=mr';
  });

  it('should return the href with the current locale', () => {
    expect(localeGetLangAwareHref(current, path)).toEqual(`https://${configOriginValue}${path}`);
  });

  it('should return the href with the alternative locale', () => {
    expect(localeGetLangAwareHref(alternative, path)).toEqual(`https://${configOriginValue}/${alternative}${path}`);
  });

  it('should support relative urls', () => {
    expect(localeGetLangAwareHref(current, path, true)).toEqual(path);
    expect(localeGetLangAwareHref(alternative, path, true)).toEqual(`/${alternative}${path}`);
  });
});
