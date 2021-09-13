import { LocationCompactInterface } from 'types/location/compact.interface';

import { BackendApiFactory } from '../factory';
import { backendApiLocationMapper } from './mapper';

export const backendApiLocationFetcher = BackendApiFactory<LocationCompactInterface[], LocationCompactInterface[]>({
  method: 'GET',
  url: 'location',
  dataMapper: backendApiLocationMapper,
});
