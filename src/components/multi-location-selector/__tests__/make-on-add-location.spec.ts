import { LocationCompactJltMock } from 'mocks/location/compact-jlt.mock';
import { LocationCompactKcMock } from 'mocks/location/compact-kc.mock';
import { multiLocationSelectorMakeOnAddLocation } from '../make-on-add-location';

import { LanguageCodeEnum } from 'enums/language/code.enum';
import { LocationCompactInterface } from 'types/location/compact.interface';
import { MultiLocationSelectorMakeOnAddLocationPropsInterface } from '../make-on-add-location-props.interface';
import { WindowLocalStorageInterface } from 'context/window/local-storage/interface';
import { WindowLocalStorageMock } from 'mocks/window/local-storage.mock';

const location1 = { ...LocationCompactKcMock, id: '1', path: '1' };
const location3 = { ...LocationCompactKcMock, id: '3', path: '3' };
const location1_2 = { ...LocationCompactKcMock, id: '2', path: '1.2' };

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
      locations: [LocationCompactKcMock],
    });

    onAddLocation({ ...LocationCompactKcMock });

    expect(onNewLocationsSpy).not.toHaveBeenCalled();
    expect(windowLocalStorageMock.setItem).not.toHaveBeenCalled();
  });

  it('should add location if it does not exist in value', () => {
    const onAddLocation = multiLocationSelectorMakeOnAddLocation({
      ...baseProps,
      locations: [LocationCompactKcMock],
    });

    windowLocalStorageMock.getItem = (): LocationCompactInterface[] => [LocationCompactKcMock];

    onAddLocation(LocationCompactJltMock);

    expect(onNewLocationsSpy).toHaveBeenCalledWith([LocationCompactKcMock, LocationCompactJltMock]);

    expect(windowLocalStorageMock.setItem).toHaveBeenCalledWith('multi-location-selector-history-en', [
      LocationCompactJltMock,
      LocationCompactKcMock,
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
