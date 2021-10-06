/**
 * @jest-environment jsdom
 */

import { StatsContextAbTestsInterface } from '@propertyfinder/pf-frontend-common/dist/module/stats/context/ab-tests.interface';

import { mockReactUseEffect } from 'mocks/react/use-effect.mock';
import { mockReactUseState } from 'mocks/react/use-state.mock';
import { mockReactUseSwr } from 'mocks/react/use-swr.mock';
import { mockWindowFetch } from 'mocks/window/fetch.mock';
import { filtersValueStub } from 'stubs/filters/value/stub';
import { propertyStub } from 'stubs/property/stub';
import { statsDataObfuscatedStub } from 'stubs/stats-data/obfuscated.stub';

import { StatsContexterService } from 'services/stats/contexter.service';
import { StatsService } from 'services/stats/service';

import { usePropertySearchTrackPageView } from '../track-page-view.hook';
import { PropertySearchViewPropsType } from '../view-props.type';

describe('usePropertySearchTrackPageView', () => {
  beforeEach(() => {
    mockReactUseState();
    mockReactUseEffect();

    (StatsService().reset as jest.Mock).mockReset();
    (StatsService().pageView as jest.Mock).mockReset();
    (StatsService().propertySerp as jest.Mock).mockReset();
    (StatsService().propertyLoad as jest.Mock).mockReset();
  });

  it('should do nothing if page failed to load', () => {
    usePropertySearchTrackPageView(undefined, {
      ok: false,
      error: '',
    });

    expect(StatsService().reset).not.toHaveBeenCalled();
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

    expect(StatsService().reset).not.toHaveBeenCalled();
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

    expect(StatsService().reset).not.toHaveBeenCalled();
  });

  it('should send pageview events', () => {
    const fetchMock = mockWindowFetch({ ok: false });
    const filtersValueFromQuery = filtersValueStub();

    const setAbTestsSpy = jest.spyOn(StatsContexterService(), 'setAbTests');
    const setPropertySearchSpy = jest.spyOn(StatsContexterService(), 'setPropertySearch');
    const setPropertyCategoryIdentifierSpy = jest.spyOn(StatsContexterService(), 'setPropertyCategoryIdentifier');
    const setPropertySerpSpy = jest.spyOn(StatsContexterService(), 'setPropertySerp');

    const abTests: StatsContextAbTestsInterface = { test91: { variants: { variantA: true }, async: false } };
    usePropertySearchTrackPageView(undefined, {
      ok: true,
      filtersValueFromQuery,
      searchResult: { total: 5, properties: [propertyStub()] },
      abTests,
    } as PropertySearchViewPropsType);

    expect(setAbTestsSpy).toHaveBeenCalledTimes(1);
    expect(setPropertySearchSpy).toHaveBeenCalledTimes(1);
    expect(setPropertyCategoryIdentifierSpy).toHaveBeenCalledTimes(1);
    expect(setPropertySerpSpy).toHaveBeenCalledTimes(1);

    expect(setAbTestsSpy).toHaveBeenCalledWith(abTests);
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

    expect(StatsService().reset).toHaveBeenCalledTimes(1);
    expect(StatsService().pageView).toHaveBeenCalledTimes(1);
    expect(StatsService().propertySerp).toHaveBeenCalledTimes(1);

    expect(StatsService().propertySerp).toHaveBeenCalledWith({
      pagination: { itemPerPage: 25, itemTotal: 5, pageCurrent: 1 },
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      'default-origin/en/api/pwa/property-search/stats-data?propertiesIds%5B%5D=198023&pageNumber=1',
      { headers: { locale: 'en' }, method: 'GET' }
    );
  });

  it('should send listing loaded event', async () => {
    mockWindowFetch({ json: () => Promise.resolve(statsDataObfuscatedStub()) });
    const filtersValueFromQuery = filtersValueStub();

    StatsContexterService().setAbTests = jest.fn();
    StatsContexterService().setPropertySearch = jest.fn();
    StatsContexterService().setPropertyCategoryIdentifier = jest.fn();
    StatsContexterService().setPropertySerp = jest.fn();

    const { statsDataPromise } = usePropertySearchTrackPageView(undefined, {
      ok: true,
      filtersValueFromQuery,
      searchResult: { total: 5, properties: [propertyStub()] },
    } as PropertySearchViewPropsType);

    await statsDataPromise;

    expect(StatsService().propertyLoad).toHaveBeenCalledWith(198023, {
      pagination: { itemPerPage: 25, itemTotal: 5, pageCurrent: 1 },
    });
  });
});
