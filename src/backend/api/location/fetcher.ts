import { BackendApiFactory } from '../factory';
import { backendApiLocationMapper } from './mapper';

import { LocationCompactInterface } from 'components/location/compact.interface';

export const backendApiLocationFetcher = BackendApiFactory<LocationCompactInterface[], LocationCompactInterface[]>({
  method: 'GET',
  url: 'location',
  dataMapper: backendApiLocationMapper,
});
