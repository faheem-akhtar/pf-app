import { configCommon } from 'config/common';

import { breadcrumbMapQueryToFilters } from '../map-query-to-filters';

describe('breadcrumbMapQueryToFilters()', () => {
  it('should map correctly when locale is current', () => {
    expect(breadcrumbMapQueryToFilters(configCommon.language.current, '/en/search?l=6&t=1&c=1')).toMatchSnapshot();
  });

  it('should map correctly when locale is alternative', () => {
    expect(breadcrumbMapQueryToFilters(configCommon.language.alternative, '/ar/search?l=6&t=1&c=1')).toMatchSnapshot();
  });

  it('should map correctly for multiple locations when locale is current', () => {
    expect(breadcrumbMapQueryToFilters(configCommon.language.current, '/en/search?l=6-1231&t=1&c=1')).toMatchSnapshot();
  });

  it('should map correctly for multiple locations when locale is alternative', () => {
    expect(
      breadcrumbMapQueryToFilters(configCommon.language.alternative, '/ar/search?l=6-1231&t=1&c=1')
    ).toMatchSnapshot();
  });
});
