import { LocationCompactInterface } from 'components/location/compact.interface';
import { LocationCompactMapType } from 'components/location/compact-map.type';

/**
 * Map Locations response to compact map interface
 * @param data The locations data from the api endpoint
 */
export const backendApiLocationMapper = (data: LocationCompactInterface[]): LocationCompactMapType =>
  data.reduce((acc, location) => {
    acc[location.id] = {
      name: location.name,
      abbreviation: location.abbreviation,
      id: location.id,
      path: location.name,
      path_name: location.path_name,
    };
    return acc;
  }, {} as LocationCompactMapType);
