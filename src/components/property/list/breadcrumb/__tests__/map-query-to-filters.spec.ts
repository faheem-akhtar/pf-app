import { locationCompactStub } from 'stubs/location';

import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { LocationService } from 'services/location/service';

import { breadcrumbMapQueryToFilters } from '../map-query-to-filters';

jest.mock('services/location/service');

describe('breadcrumbMapQueryToFilters()', () => {
  it('should map correctly when locale is current', () => {
    (LocationService.find as jest.Mock).mockReturnValue(locationCompactStub());

    expect(breadcrumbMapQueryToFilters('/en/search?l=6&t=1&c=1')).toMatchSnapshot();
  });

  it('should map correctly when locale is alternative', () => {
    (LocationService.find as jest.Mock).mockReturnValue(
      locationCompactStub({ name: 'أبوظبي', abbreviation: '', path: 'أبوظبي', path_name: '', slug: 'أبوظبي' })
    );

    expect(breadcrumbMapQueryToFilters('/ar/search?l=6&t=1&c=1')).toMatchSnapshot();
  });

  it('should map correctly for multiple locations', () => {
    const locations = [
      locationCompactStub(),
      locationCompactStub({
        name: 'The Tower',
        abbreviation: '',
        id: '1231',
        path: 'The Tower',
        path_name: 'Dubai, Sheikh Zayed Road',
        slug: 'sheikh-zayed-road-the-tower',
      }),
    ];

    breadcrumbMapQueryToFilters('/en/search?l=6-1231&t=1&c=1');

    locations.forEach((location) => {
      (LocationService.find as jest.Mock).mockReturnValue(location);
    });

    expect.objectContaining({
      [FiltersParametersEnum.locationsIds]: locations,
    });
  });
});
