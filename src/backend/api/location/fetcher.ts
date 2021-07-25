import { backendApiFactory } from '../backend-factory';

import { LocationCompactInterface } from 'components/location/compact.interface';
import { backendApiLocationMapper } from './mapper';

export const backendApiLocationFetcher = backendApiFactory<LocationCompactInterface[], LocationCompactInterface[]>({
  method: 'GET',
  url: 'location',
  dataMapper: backendApiLocationMapper,
});
