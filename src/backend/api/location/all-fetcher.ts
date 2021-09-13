import { LocationCompactInterface } from 'types/location/compact.interface';

import { BackendApiFactory } from '../factory';
import { backendApiLocationAllMapper } from './all-mapper';

export const backendApiLocationAllFetcher = BackendApiFactory<LocationCompactInterface[], LocationCompactInterface[]>({
  method: 'GET',
  url: 'autocomplete/location',
  dataMapper: backendApiLocationAllMapper,
});
