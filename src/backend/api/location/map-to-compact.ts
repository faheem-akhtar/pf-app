import { LocationCompactInterface } from 'types/location/compact.interface';

export const backendApiLocationMapToCompact = (location: LocationCompactInterface): LocationCompactInterface => ({
  name: location.name,
  abbreviation: location.abbreviation,
  id: location.id,
  path: location.name,
  path_name: location.path_name,
});
