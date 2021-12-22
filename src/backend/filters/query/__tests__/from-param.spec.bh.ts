import { FiltersQueryParamEnum } from 'components/filters/query/param.enum';
import { configCommon } from 'config/common';

import { backendFiltersQueryFromParam } from '../from-param';

describe('backendFiltersQueryFromParam() Bahrain', () => {
  describe('location / city', () => {
    [
      ['adliya', 'manama-adliya'],
      ['al-hidd', 'hidd'],
      ['um-al-hasam', 'manama-um-al-hasam'],
      ['tubli-tubli-bay', 'tubli'],
      ['gudaibiya', 'manama-gudaibiya'],
      ['manama-city', 'manama'],
      ['al-riffa', 'riffa'],
      ['manama-city', 'manama'],
      ['al-salmaniya', 'manama-salmaniya'],
    ].forEach(([oldSlug, newSlug]) => {
      it(`should do a redirection for ${configCommon.language.current} urls ${oldSlug}`, () => {
        expect(
          backendFiltersQueryFromParam(
            {
              [FiltersQueryParamEnum.location]: oldSlug,
            },
            configCommon.language.current,
            `/en/abc-${oldSlug}.html`
          )
        ).toEqual({
          error: false,
          query: {},
          redirect: {
            permanent: true,
            destination: `/en/abc-${newSlug}.html`,
          },
        });
      });
    });

    [[encodeURI('المنطقة-الشمالية'), encodeURI('المحافظة-الشمالية')]].forEach(([oldSlug, newSlug]) => {
      it(`should do a redirection for ${configCommon.language.alternative} urls ${oldSlug}`, () => {
        expect(
          backendFiltersQueryFromParam(
            {
              [FiltersQueryParamEnum.location]: oldSlug,
            },
            configCommon.language.alternative,
            `/ar/abc-${oldSlug}.html`
          )
        ).toEqual({
          error: false,
          query: {},
          redirect: {
            permanent: true,
            destination: `/ar/abc-${newSlug}.html`,
          },
        });
      });
    });
  });
});
