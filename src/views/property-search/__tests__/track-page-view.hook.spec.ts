/**
 * @jest-environment jsdom
 */

import { mockReactUseEffect } from 'mocks/react/use-effect.mock';
import { mockReactUseState } from 'mocks/react/use-state.mock';
import { mockReactUseSwr } from 'mocks/react/use-swr.mock';
import { filtersValueStub } from 'stubs/filters/value/stub';

import { StatsContexterService } from 'services/stats/contexter.service';
import { StatsService } from 'services/stats/service';

import { usePropertySearchTrackPageView } from '../track-page-view.hook';
import { PropertySearchViewPropsType } from '../view-props.type';

describe('usePropertySearchTrackPageView', () => {
  beforeEach(() => {
    mockReactUseState();
    mockReactUseEffect();
  });

  it('should do nothing if page failed to load', () => {
    usePropertySearchTrackPageView(undefined, {
      ok: false,
      error: '',
    });

    const resetSpy = jest.spyOn(StatsService(), 'reset');

    expect(resetSpy).not.toHaveBeenCalled();
  });

  it('should do nothing if prev page pageprops failed to load', () => {
    const filtersValueFromQuery = {};

    usePropertySearchTrackPageView(
      {
        ok: false,
        error: '',
      },
      {
        ok: true,
        filtersValueFromQuery,
        searchResult: { properties: [{}] },
      } as PropertySearchViewPropsType
    );

    const resetSpy = jest.spyOn(StatsService(), 'reset');

    expect(resetSpy).not.toHaveBeenCalled();
  });

  it('should do nothing if props has not been changed', () => {
    mockReactUseSwr('en-property-search/stats-data-GET-{"propertiesIds":[null]}', {});

    const filtersValueFromQuery = {};
    usePropertySearchTrackPageView(
      {
        ok: true,
        searchResult: { properties: [{}] },
        filtersValueFromQuery,
      } as PropertySearchViewPropsType,
      {
        ok: true,
        searchResult: { properties: [{}] },
        filtersValueFromQuery,
      } as PropertySearchViewPropsType
    );

    const resetSpy = jest.spyOn(StatsService(), 'reset');

    expect(resetSpy).not.toHaveBeenCalled();
  });

  it('should send pageview events', () => {
    mockReactUseSwr('en-property-search/stats-data-GET-{"propertiesIds":[null],"pageNumber":1}', {});

    const filtersValueFromQuery = filtersValueStub();

    const setAbTestsSpy = jest.spyOn(StatsContexterService(), 'setAbTests');
    const setPropertySearchSpy = jest.spyOn(StatsContexterService(), 'setPropertySearch');
    const setPropertyCategoryIdentifierSpy = jest.spyOn(StatsContexterService(), 'setPropertyCategoryIdentifier');
    const setPropertySerpSpy = jest.spyOn(StatsContexterService(), 'setPropertySerp');

    const resetSpy = jest.spyOn(StatsService(), 'reset');
    const pageViewSpy = jest.spyOn(StatsService(), 'pageView');
    const propertySerpSpy = jest.spyOn(StatsService(), 'propertySerp');

    usePropertySearchTrackPageView(undefined, {
      ok: true,
      filtersValueFromQuery,
      searchResult: { total: 5, properties: [{}] },
    } as PropertySearchViewPropsType);

    expect(setAbTestsSpy).toHaveBeenCalledTimes(1);
    expect(setPropertySearchSpy).toHaveBeenCalledTimes(1);
    expect(setPropertyCategoryIdentifierSpy).toHaveBeenCalledTimes(1);
    expect(setPropertySerpSpy).toHaveBeenCalledTimes(1);

    expect(setAbTestsSpy).toHaveBeenCalledWith({});
    expect(setPropertySearchSpy).toHaveBeenCalledWith({
      amenities: [],
      category: 2,
      is_developer_property: false,
      locations: [],
      rental_period: 'y',
      sort: 'mr',
    });
    expect(setPropertyCategoryIdentifierSpy).toHaveBeenCalledWith('rent');
    expect(setPropertySerpSpy).toHaveBeenCalledWith(true);

    expect(resetSpy).toHaveBeenCalledTimes(1);
    expect(pageViewSpy).toHaveBeenCalledTimes(1);
    expect(propertySerpSpy).toHaveBeenCalledTimes(1);

    expect(propertySerpSpy).toHaveBeenCalledWith({ pagination: { itemPerPage: 25, itemTotal: 5, pageCurrent: 1 } });
  });
});
