import { locationCompactJltStub, locationCompactKcStub } from 'stubs/location';
import { windowStorageStub } from 'stubs/window/storage.stub';

import { LanguageCodeEnum } from 'enums/language/code.enum';
import { WindowStorageInterface } from 'services/window/storage/interface';
import { LocationCompactInterface } from 'types/location/compact.interface';

import { multiLocationSelectorMakeOnAddLocation } from '../make-on-add-location';
import { MultiLocationSelectorMakeOnAddLocationPropsInterface } from '../make-on-add-location-props.interface';

const location1 = { ...locationCompactKcStub, id: '1', path: '1' };
const location3 = { ...locationCompactKcStub, id: '3', path: '3' };
const location1_2 = { ...locationCompactKcStub, id: '2', path: '1.2' };

describe('multiLocationSelectorMakeOnAddLocation', () => {
  let onNewLocationsSpy: jest.Mock;
  let localStorageStub: WindowStorageInterface;

  let baseProps: MultiLocationSelectorMakeOnAddLocationPropsInterface;

  beforeEach(() => {
    onNewLocationsSpy = jest.fn();
    localStorageStub = windowStorageStub();

    baseProps = {
      locations: [],
      onNewLocations: onNewLocationsSpy,
      localStorage: localStorageStub,
      locale: LanguageCodeEnum.en,
      maxHistoryLength: 3,
    };
  });

  it('should do nothing if location is already exist in value', () => {
    const onAddLocation = multiLocationSelectorMakeOnAddLocation({
      ...baseProps,
      locations: [locationCompactKcStub],
    });

    onAddLocation({ ...locationCompactKcStub });

    expect(onNewLocationsSpy).not.toHaveBeenCalled();
    expect(localStorageStub.setItem).not.toHaveBeenCalled();
  });

  it('should add location if it does not exist in value', () => {
    const onAddLocation = multiLocationSelectorMakeOnAddLocation({
      ...baseProps,
      locations: [locationCompactKcStub],
    });

    localStorageStub.getItem = (): LocationCompactInterface[] => [locationCompactKcStub];

    onAddLocation(locationCompactJltStub);

    expect(onNewLocationsSpy).toHaveBeenCalledWith([locationCompactKcStub, locationCompactJltStub]);

    expect(localStorageStub.setItem).toHaveBeenCalledWith('multi-location-selector-history-en', [
      locationCompactJltStub,
      locationCompactKcStub,
    ]);
  });

  it('should replace parent location if child location is added', () => {
    const onAddLocation = multiLocationSelectorMakeOnAddLocation({
      ...baseProps,
      locations: [location1, location3],
    });

    onAddLocation(location1_2);

    expect(onNewLocationsSpy).toHaveBeenCalledWith([location3, location1_2]);
  });

  it('should replace child location if parent location is added', () => {
    const onAddLocation = multiLocationSelectorMakeOnAddLocation({
      ...baseProps,
      locations: [location1_2, location3],
    });

    onAddLocation(location1);

    expect(onNewLocationsSpy).toHaveBeenCalledWith([location3, location1]);
  });
});
