import { FiltersQueryParamEnum } from 'components/filters/query/param.enum';
import { configCommon } from 'config/common';

import { backendFiltersQueryFromParam } from '../from-param';

describe('backendFiltersQueryFromParam() Saudi', () => {
  describe('location / city', () => {
    ['riyadh'].forEach((invalidSlug) => {
      it(`should do a redirection for ${configCommon.language.current} urls ${invalidSlug}`, () => {
        [
          [
            `/en/rent/ar-${invalidSlug}/villas-for-rent-${invalidSlug}.html`,
            `/en/rent/ar-${invalidSlug}/villas-for-rent.html`,
          ],
          [
            `/en/rent/${invalidSlug}/villas-for-rent-${invalidSlug}-abc.html`,
            `/en/rent/${invalidSlug}/villas-for-rent-abc.html`,
          ],
        ].forEach(([uri, destination]) => {
          expect(
            backendFiltersQueryFromParam(
              {
                [FiltersQueryParamEnum.location]: invalidSlug,
              },
              configCommon.language.current,
              uri
            )
          ).toEqual({
            error: false,
            query: {},
            redirect: {
              permanent: true,
              destination,
            },
          });
        });
      });
    });
  });
});
