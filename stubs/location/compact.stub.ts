import { LocationCompactInterface } from 'types/location/compact.interface';

export const locationCompactStub = (data: Partial<LocationCompactInterface> = {}): LocationCompactInterface => ({
  name: 'Abu Dhabi',
  slug: 'abu-dhabi',
  id: '6',
  abbreviation: '',
  path: 'Abu Dhabi',
  path_name: '',
  ...data,
});
