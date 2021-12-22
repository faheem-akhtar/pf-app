import { BackendModelLocationAutocompleteInterface } from 'backend/model/location/autocomplete.interface';
import { LocationCompactInterface } from 'types/location/compact.interface';

import { backendApiLocationAutocompleteMapToCompact } from './autocomplete-map-to-compact';

// TODO-FE[CX-409] add tests
/**
 * Map Locations response to compact map interface
 * @param data The locations data from the api endpoint
 */
export const backendApiLocationAllMapper = (
  data: BackendModelLocationAutocompleteInterface[]
): LocationCompactInterface[] => data.map(backendApiLocationAutocompleteMapToCompact);
