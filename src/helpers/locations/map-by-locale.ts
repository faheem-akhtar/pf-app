import { LocationCompactInterface } from 'types/location/compact.interface';
import { LocationCompactMapType } from 'types/location/compact-map.type';

import locationsByLocale from '../../../public/static/locations';

const locationsMap: Record<string, LocationCompactMapType> = {};

/**
 * @param locale Active locale
 */
export const locationsMapByLocale = (locale: string): LocationCompactMapType => {
  const locations = (locationsByLocale as unknown as Record<string, LocationCompactInterface[]>)[locale];
  Object.keys(locationsByLocale).forEach(() => {
    locationsMap[locale] = locations.reduce(
      (map: Record<string, LocationCompactInterface>, location: LocationCompactInterface) => {
        map[location.id] = location;
        return map;
      },
      {} as Record<string, LocationCompactInterface>
    );
  });

  return locationsMap[locale];
};
