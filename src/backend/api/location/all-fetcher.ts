import { backendApiLocationAllMapper } from './all-mapper';

import { BackendApiFactory } from '../factory';

import { LocationCompactInterface } from 'types/location/compact.interface';

export const backendApiLocationAllFetcher = BackendApiFactory<LocationCompactInterface[], LocationCompactInterface[]>({
  method: 'GET',
  url: 'autocomplete/location',
  dataMapper: backendApiLocationAllMapper,
});
