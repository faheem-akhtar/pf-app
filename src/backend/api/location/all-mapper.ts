import { backendApiLocationMapToCompact } from './map-to-compact';

import { LocationCompactInterface } from 'components/location/compact.interface';

/**
 * Map Locations response to compact map interface
 * @param data The locations data from the api endpoint
 */
export const backendApiLocationAllMapper = (data: LocationCompactInterface[]): LocationCompactInterface[] =>
  data.map((location) => backendApiLocationMapToCompact(location));
