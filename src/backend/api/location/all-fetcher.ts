import { backendApiFactory } from '../backend-factory';

import { LocationCompactInterface } from 'components/location/compact.interface';
import { backendApiAllLocationMapper } from './all-mapper';

export const backendApiLocationAllFetcher = backendApiFactory<LocationCompactInterface[], LocationCompactInterface[]>({
  method: 'GET',
  url: 'autocomplete/location',
  dataMapper: backendApiAllLocationMapper,
});
