import { backendApiFactory } from '../backend-factory';

import { LocationCompactInterface } from 'components/location/compact.interface';
import { LocationCompactMapType } from 'components/location/compact-map.type';
import { backendApiLocationMapper } from './mapper';

export const backendApiLocationAllFetcher = backendApiFactory<LocationCompactMapType, LocationCompactInterface[]>({
  method: 'GET',
  url: 'autocomplete/location',
  dataMapper: backendApiLocationMapper,
});
