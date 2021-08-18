import { backendApiLocationMapToCompact } from './map-to-compact';

import { LocationCompactInterface } from 'types/location/compact.interface';

// TODO-FE[CX-409] add tests
/**
 * Map Locations response to compact map interface
 * @param data The locations data from the api endpoint
 */
export const backendApiLocationAllMapper = (data: LocationCompactInterface[]): LocationCompactInterface[] =>
  data.map((location) => backendApiLocationMapToCompact(location));
