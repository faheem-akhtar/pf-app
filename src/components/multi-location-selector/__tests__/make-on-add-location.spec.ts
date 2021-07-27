import { locationCompactJltMock } from 'mocks/location/compact-jlt.mock';
import { locationCompactKcMock } from 'mocks/location/compact-kc.mock';
import { multiLocationSelectorMakeOnAddLocation } from '../make-on-add-location';

import { LanguageCodeEnum } from 'enums/language/code.enum';
import { LocationCompactInterface } from 'components/location/compact.interface';
import { MultiLocationSelectorMakeOnAddLocationPropsInterface } from '../make-on-add-location-props.interface';
import { WindowLocalStorageInterface } from 'helpers/window/local-storage/interface';
import { WindowLocalStorageMock } from 'mocks/window/local-storage.mock';


const location1 = { ...locationCompactKcMock, id: '1', path: '1' };
const location3 = { ...locationCompactKcMock, id: '3', path: '3' };
const location1_2 = { ...locationCompactKcMock, id: '2', path: '1.2' };

describe('multiLocationSelectorMakeOnAddLocation', () => {
  let onNewLocationsSpy: jest.Mock;
  let windowLocalStorageMock: WindowLocalStorageInterface;

  let baseProps: MultiLocationSelectorMakeOnAddLocationPropsInterface;

  beforeEach(() => {
    onNewLocationsSpy = jest.fn();
    windowLocalStorageMock = WindowLocalStorageMock();

    baseProps = {
      locations: [],
      onNewLocations: onNewLocationsSpy,
      localStorage: windowLocalStorageMock,
      locale: LanguageCodeEnum.en,
      maxHistoryLength: 3,
    };
  });

  it('should do nothing if location is already exist in value', () => {
    const onAddLocation = multiLocationSelectorMakeOnAddLocation({
      ...baseProps,
      locations: [locationCompactKcMock],
    });

    onAddLocation({ ...locationCompactKcMock });

    expect(onNewLocationsSpy).not.toHaveBeenCalled();
    expect(windowLocalStorageMock.setItem).not.toHaveBeenCalled();
  });

  it('should add location if it does not exist in value', () => {
    const onAddLocation = multiLocationSelectorMakeOnAddLocation({
      ...baseProps,
      locations: [locationCompactKcMock],
    });

    windowLocalStorageMock.getItem = (): LocationCompactInterface[] => [locationCompactKcMock];

    onAddLocation(locationCompactJltMock);

    expect(onNewLocationsSpy).toHaveBeenCalledWith([locationCompactKcMock, locationCompactJltMock]);

    expect(windowLocalStorageMock.setItem).toHaveBeenCalledWith('multi-location-selector-history-en', [
      locationCompactJltMock,
      locationCompactKcMock,
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
