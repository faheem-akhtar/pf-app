import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { FunctionComponent, ReactElement, useContext } from 'react';

import { mockReactUseSwr } from 'mocks/react/use-swr.mock';
import { filtersContextPropsStub } from 'stubs/filters/context-props.stub';
import { jwtTokenStoreStub } from 'stubs/jwt/token/store.stub';
import { saveSearchDataStub } from 'stubs/save-search/data.stub';
import { userModelStub } from 'stubs/user/model.stub';

import * as apiSaveSearchCreateFetcherModule from 'api/save-search/create/fetcher';
import { FiltersContextProvider } from 'components/filters/context-provider';
import { FiltersValueInterface } from 'components/filters/value/interface';
import { UserContext } from 'components/user/context';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { SaveSearchFrequencyEnum } from 'enums/save-search/frequency.enum';
import { LocationCompactInterface } from 'types/location/compact.interface';

import { SaveSearchContext } from '../context';
import { SaveSearchContextProvider } from '../context-provider';

jest.mock('services/jwt/token/store', () => ({
  JwtTokenStore: jest.fn().mockImplementation(() => jwtTokenStoreStub()),
}));

describe('SaveSearchContextProvider', () => {
  let MockChildComponent: FunctionComponent;

  beforeEach(() => {
    window.dataLayer = [];
    mockReactUseSwr('en-saved-search-GET-{"page[limit]":9999}', { ok: null });

    // eslint-disable-next-line react/display-name
    MockChildComponent = (): ReactElement => {
      const saveSearch = useContext(SaveSearchContext);

      return (
        <>
          <button
            onClick={(): void => {
              saveSearch.create({ name: 'my search', frequency: SaveSearchFrequencyEnum.DAILY });
            }}
          >
            {JSON.stringify(saveSearch.data)}
          </button>
          <p>{JSON.stringify(saveSearch.filtered)}</p>
        </>
      );
    };
  });

  describe('create', () => {
    const mockData = saveSearchDataStub();

    it('should accept data, filtered and create', async () => {
      jest.spyOn(apiSaveSearchCreateFetcherModule, 'apiSaveSearchCreateFetcher').mockReturnValue(
        Promise.resolve({
          ok: true,
          data: mockData,
          headers: {} as Headers,
        })
      );
      const { getByRole } = render(
        <FiltersContextProvider {...filtersContextPropsStub()}>
          <SaveSearchContextProvider>
            <MockChildComponent />
          </SaveSearchContextProvider>
        </FiltersContextProvider>
      );

      const button = getByRole('button');

      expect(button).toHaveTextContent('[]');

      await act(async () => {
        await userEvent.click(button);
      });

      expect(button).toHaveTextContent(JSON.stringify([mockData]));
    });

    it('should trigger the ga event for create', async () => {
      jest.spyOn(apiSaveSearchCreateFetcherModule, 'apiSaveSearchCreateFetcher').mockReturnValue(
        Promise.resolve({
          ok: true,
          data: mockData,
          headers: {} as Headers,
        })
      );

      const { getByRole } = render(
        <FiltersContextProvider
          {...filtersContextPropsStub()}
          filtersValueFromQuery={
            {
              [FiltersParametersEnum.locationsIds]: [{ id: '50' }, { id: '51' }] as LocationCompactInterface[],
            } as FiltersValueInterface
          }
        >
          <SaveSearchContextProvider>
            <MockChildComponent />
          </SaveSearchContextProvider>
        </FiltersContextProvider>
      );

      await act(async () => {
        await userEvent.click(getByRole('button'));
      });

      expect(window.dataLayer).toEqual([
        {
          event: 'customEvent',
          eventAction: 'create:success',
          eventCategory: 'Saved Search',
          eventLabel: '|location:50||location:51|',
        },
      ]);
    });

    it('should do nothing if create response failed', async () => {
      jest.spyOn(apiSaveSearchCreateFetcherModule, 'apiSaveSearchCreateFetcher').mockReturnValue(
        Promise.resolve({
          ok: false,
          error: {
            url: '',
            status: 400,
            body: '',
          },
          headers: {} as Headers,
        })
      );

      const { getByRole } = render(
        <FiltersContextProvider
          {...filtersContextPropsStub()}
          filtersValueFromQuery={
            {
              [FiltersParametersEnum.locationsIds]: [{ id: '50' }, { id: '51' }] as LocationCompactInterface[],
            } as FiltersValueInterface
          }
        >
          <SaveSearchContextProvider>
            <MockChildComponent />
          </SaveSearchContextProvider>
        </FiltersContextProvider>
      );

      const button = getByRole('button');

      expect(button).toHaveTextContent('[]');

      await act(async () => {
        await userEvent.click(button);
      });

      expect(window.dataLayer).toEqual([]);

      expect(button).toHaveTextContent('[]');
    });
  });

  it('should update the searches from the server', () => {
    const mockData = saveSearchDataStub();

    mockReactUseSwr('en-saved-search-GET-{"page[limit]":9999}', { ok: true, data: [mockData] });

    const { getByRole } = render(
      <FiltersContextProvider {...filtersContextPropsStub()}>
        <UserContext.Provider value={userModelStub()}>
          <SaveSearchContextProvider>
            <MockChildComponent />
          </SaveSearchContextProvider>
        </UserContext.Provider>
      </FiltersContextProvider>
    );

    expect(getByRole('button')).toHaveTextContent(JSON.stringify([mockData]));
  });
});
