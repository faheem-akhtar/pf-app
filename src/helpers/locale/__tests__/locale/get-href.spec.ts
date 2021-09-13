import { configCommon } from 'config/common';
import { configOriginValue } from 'config/origin/value';
import { localeGetHref } from 'helpers/locale/get-href';

describe('localeGetHref', () => {
  const { current, alternative } = configCommon.language;
  let path: string;

  beforeEach(() => {
    path = '/search?l=104&c=2&fu=0&rp=y&ob=mr';
  });

  it('should return the href with the current locale', () => {
    expect(localeGetHref(current, path)).toEqual(`${configOriginValue}/${current}${path}`);
  });

  it('should return the href with the alternative locale', () => {
    expect(localeGetHref(alternative, path)).toEqual(`${configOriginValue}/${alternative}${path}`);
  });
});
