/**
 * @jest-environment jsdom
 */
import { fireEvent, render } from '@testing-library/react';
import { FunctionComponent, ReactElement } from 'react';

import * as apiSavedPropertiesCreateFetcherModule from 'api/saved-properties/create-fetcher';
import * as useApiSavedPropertiesModule from 'api/saved-properties/hook';
import * as apiSavedPropertiesRemoveFetcherModule from 'api/saved-properties/remove-fetcher';
import * as UserContextModule from 'context/user/context';
import * as dateToIsoModule from 'helpers/date/to-iso';
import { UserModelInterface } from 'services/user/model.interface';
import { WindowService } from 'services/window/service';

import { SavedPropertyInterface } from '../interface';
import { useSavedPropertyState } from '../state.hook';

jest.mock('api/saved-properties/hook');
jest.mock('helpers/date/to-iso');
jest.mock('services/window/service');
jest.mock('api/saved-properties/create-fetcher');
jest.mock('api/saved-properties/remove-fetcher');
jest.mock('services/auth/service');
jest.mock('context/user/context');

describe('useSavedPropertyState', () => {
  let MockComponent: FunctionComponent<{ propertyId: number }>;

  beforeEach(() => {
    (dateToIsoModule.dateToIso as jest.Mock).mockReturnValue('2020-01-01');

    (WindowService.localStorage.getItem as jest.Mock).mockReset();
    (WindowService.localStorage.setItem as jest.Mock).mockReset();
    (apiSavedPropertiesCreateFetcherModule.apiSavedPropertiesCreateFetcher as jest.Mock).mockReset();
    (apiSavedPropertiesRemoveFetcherModule.apiSavedPropertiesRemoveFetcher as jest.Mock).mockReset();

    (useApiSavedPropertiesModule.useApiSavedProperties as jest.Mock).mockReturnValue({ ok: null });

    // eslint-disable-next-line react/display-name
    MockComponent = ({ propertyId }): ReactElement => {
      const [savedProperties, setSavedProperty, removeSavedProperty] = useSavedPropertyState();

      return (
        <>
          <button onClick={(): void => setSavedProperty(propertyId)} data-testid='add-button'>
            {JSON.stringify(savedProperties)}
          </button>
          <button onClick={(): void => removeSavedProperty(propertyId)} data-testid='remove-button'>
            Remove it
          </button>
        </>
      );
    };
  });

  it('should have the default values', () => {
    const { getByTestId } = render(<MockComponent propertyId={1} />);
    const button = getByTestId('add-button') as HTMLButtonElement;

    expect(button).toHaveTextContent('[]');
  });

  it('should display contacted properties return from the server', () => {
    const mockData = [
      {
        id: '1',
        propertyId: 101,
        saveDate: '2021-09-14',
      } as SavedPropertyInterface,
    ];

    (useApiSavedPropertiesModule.useApiSavedProperties as jest.Mock).mockReturnValue({
      ok: true,
      data: mockData,
    });

    const { getByTestId } = render(
      <UserContextModule.UserContext.Provider value={{ userId: '1' } as UserModelInterface}>
        <MockComponent propertyId={1} />
      </UserContextModule.UserContext.Provider>
    );

    const button = getByTestId('add-button') as HTMLButtonElement;

    expect(button).toHaveTextContent(JSON.stringify(mockData));
  });

  it('should add the new property as contacted', () => {
    const { getByTestId } = render(<MockComponent propertyId={1} />);
    const button = getByTestId('add-button') as HTMLButtonElement;

    expect(button).toHaveTextContent('[]');

    fireEvent.click(button);

    expect(button).toHaveTextContent(JSON.stringify({ propertyId: 1, saveDate: '2020-01-01' }));
    expect(WindowService.localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(apiSavedPropertiesCreateFetcherModule.apiSavedPropertiesCreateFetcher).not.toHaveBeenCalled();
  });

  it('should not duplicate the property', () => {
    (useApiSavedPropertiesModule.useApiSavedProperties as jest.Mock).mockReturnValue({
      ok: true,
      data: [{ propertyId: 1 }],
    });

    const { getByTestId } = render(
      <UserContextModule.UserContext.Provider value={{ userId: '1' } as UserModelInterface}>
        <MockComponent propertyId={1} />
      </UserContextModule.UserContext.Provider>
    );
    const button = getByTestId('add-button') as HTMLButtonElement;

    fireEvent.click(button);

    expect(button).toHaveTextContent(JSON.stringify({ propertyId: 1, saveDate: '2020-01-01' }));
  });

  it('should update the server if user is logged in', () => {
    const { getByTestId } = render(
      <UserContextModule.UserContext.Provider value={{ userId: '1' } as UserModelInterface}>
        <MockComponent propertyId={1} />
      </UserContextModule.UserContext.Provider>
    );
    const button = getByTestId('add-button') as HTMLButtonElement;

    expect(button).toHaveTextContent('[]');

    fireEvent.click(button);

    expect(button).toHaveTextContent(JSON.stringify({ propertyId: 1, saveDate: '2020-01-01' }));
    expect(WindowService.localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(apiSavedPropertiesCreateFetcherModule.apiSavedPropertiesCreateFetcher).toHaveBeenCalledTimes(1);
    expect(apiSavedPropertiesCreateFetcherModule.apiSavedPropertiesCreateFetcher).toHaveBeenCalledWith({
      propertyId: 1,
      saveDate: '2020-01-01',
    });
  });

  it('should remove the saved property', () => {
    (useApiSavedPropertiesModule.useApiSavedProperties as jest.Mock).mockReturnValue({
      ok: true,
      data: [{ propertyId: 1 }],
    });

    const { getByTestId } = render(<MockComponent propertyId={1} />);
    const addButton = getByTestId('add-button') as HTMLButtonElement;
    const removeButton = getByTestId('remove-button') as HTMLButtonElement;

    fireEvent.click(removeButton);

    expect(addButton).toHaveTextContent('[]');
    expect(apiSavedPropertiesRemoveFetcherModule.apiSavedPropertiesRemoveFetcher).not.toHaveBeenCalled();
  });

  it('should remove from the server if user is logged in', () => {
    (useApiSavedPropertiesModule.useApiSavedProperties as jest.Mock).mockReturnValue({
      ok: true,
      data: [{ propertyId: 1 }],
    });

    const { getByTestId } = render(
      <UserContextModule.UserContext.Provider value={{ userId: '1' } as UserModelInterface}>
        <MockComponent propertyId={1} />
      </UserContextModule.UserContext.Provider>
    );
    const addButton = getByTestId('add-button') as HTMLButtonElement;
    const removeButton = getByTestId('remove-button') as HTMLButtonElement;

    expect(addButton).toHaveTextContent(JSON.stringify({ propertyId: 1 }));

    (WindowService.localStorage.setItem as jest.Mock).mockReset();

    fireEvent.click(removeButton);

    expect(addButton).toHaveTextContent('[]');
    expect(WindowService.localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(WindowService.localStorage.setItem).toHaveBeenCalledWith('saved-properties', []);
    expect(apiSavedPropertiesRemoveFetcherModule.apiSavedPropertiesRemoveFetcher).toHaveBeenCalledTimes(1);
    expect(apiSavedPropertiesRemoveFetcherModule.apiSavedPropertiesRemoveFetcher).toHaveBeenCalledWith({
      propertyId: '1',
    });
  });
});
