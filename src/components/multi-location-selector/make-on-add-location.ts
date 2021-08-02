import { multiLocationSelectorUpdateHistory } from './update-history';

import { LocationCompactInterface } from 'types/location/compact.interface';
import { MultiLocationSelectorMakeOnAddLocationPropsInterface } from './make-on-add-location-props.interface';

export const multiLocationSelectorMakeOnAddLocation =
  ({
    locations,
    onNewLocations,
    localStorage,
    locale,
    maxHistoryLength,
  }: MultiLocationSelectorMakeOnAddLocationPropsInterface) =>
  (newLocation: LocationCompactInterface): string[] | void => {
    if (locations.find((location) => location.id === newLocation.id)) {
      return;
    }

    multiLocationSelectorUpdateHistory(localStorage, locale, newLocation, maxHistoryLength);

    const newLocations = [
      // Filter is selected location is a children or parent of existing
      ...locations.filter((location) => {
        const isChild = newLocation.path?.split('.').includes(location.id);
        const isParent = location.path?.split('.').includes(newLocation.id);

        return !isChild && !isParent;
      }),
      newLocation,
    ];

    onNewLocations(newLocations);
  };
