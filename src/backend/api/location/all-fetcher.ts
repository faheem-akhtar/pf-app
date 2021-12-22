import { BackendModelLocationAutocompleteInterface } from 'backend/model/location/autocomplete.interface';
import { LocationCompactInterface } from 'types/location/compact.interface';

import { BackendApiFactory } from '../factory';
import { backendApiLocationAllMapper } from './all-mapper';

export const backendApiLocationAllFetcher = (): ReturnType<typeof BackendApiFactory> =>
  BackendApiFactory<LocationCompactInterface[], BackendModelLocationAutocompleteInterface[]>({
    method: 'GET',
    url: 'autocomplete/location',
    dataMapper: backendApiLocationAllMapper,
  });
