import { LocationCompactInterface } from 'components/location/compact.interface';
import { backendApiLocationMapToCompact } from './map-to-compact';

/**
 * Map Locations response to compact map interface
 * @param data The locations data from the api endpoint
 */
export const backendApiAllLocationMapper = (data: LocationCompactInterface[]): LocationCompactInterface[] =>
  data.map((location) => backendApiLocationMapToCompact(location));
