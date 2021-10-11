/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FunctionComponent, ReactElement } from 'react';

import { userModelStub } from 'stubs/user/model.stub';

import { ApiSwrResultType } from 'api/swr-result-type';
import * as UserContextModule from 'context/user/context';
import { WindowService } from 'services/window/service';

import { useUserPropertyState } from '../state.hook';

jest.mock('services/window/service');
jest.mock('context/user/context');

describe('useUserPropertyState', () => {
  let MockComponent: FunctionComponent<{ propertyId: number; apiResponse: ApiSwrResultType<{ propertyId: number }[]> }>;
  const createFetcherMock = jest.fn();
  const removeFetcherMock = jest.fn();

  beforeEach(() => {
    (WindowService.localStorage.getItem as jest.Mock).mockReset();
    (WindowService.localStorage.setItem as jest.Mock).mockReset();
    createFetcherMock.mockReset();
    removeFetcherMock.mockReset();

    // eslint-disable-next-line react/display-name
    MockComponent = ({ propertyId, apiResponse }): ReactElement => {
      const [userProperties, setUserProperty, removeUserProperty] = useUserPropertyState(
        'my-key',
        apiResponse,
        (item) => item,
        createFetcherMock,
        removeFetcherMock
      );

      return (
        <>
          <button onClick={(): void => setUserProperty({ propertyId })} data-testid='add-button'>
            {JSON.stringify(userProperties)}
          </button>
          <button onClick={(): void => removeUserProperty({ propertyId })} data-testid='remove-button'>
            Remove it
          </button>
        </>
      );
    };
  });

  it('should have the default values', () => {
    const { getByTestId } = render(<MockComponent propertyId={1} apiResponse={{ ok: null }} />);
    const button = getByTestId('add-button') as HTMLButtonElement;

    expect(button).toHaveTextContent('[]');
  });

  it('should display properties return from the server', () => {
    const mockData = [
      {
        id: '1',
        propertyId: 101,
        date: '2021-09-14',
      },
    ];

    const { getByTestId } = render(
      <UserContextModule.UserContext.Provider value={userModelStub()}>
        <MockComponent propertyId={1} apiResponse={{ ok: true, data: mockData, headers: {} as Headers }} />
      </UserContextModule.UserContext.Provider>
    );

    const button = getByTestId('add-button') as HTMLButtonElement;

    expect(button).toHaveTextContent(JSON.stringify(mockData));
  });

  it('should add the new property as contacted', () => {
    const { getByTestId } = render(<MockComponent propertyId={1} apiResponse={{ ok: null }} />);
    const button = getByTestId('add-button') as HTMLButtonElement;

    expect(button).toHaveTextContent('[]');

    userEvent.click(button);

    expect(button).toHaveTextContent(JSON.stringify({ propertyId: 1 }));
    expect(WindowService.localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(createFetcherMock).not.toHaveBeenCalled();
  });

  it('should not duplicate the property', () => {
    const { getByTestId } = render(
      <UserContextModule.UserContext.Provider value={userModelStub()}>
        <MockComponent propertyId={1} apiResponse={{ ok: true, data: [{ propertyId: 1 }], headers: {} as Headers }} />
      </UserContextModule.UserContext.Provider>
    );
    const button = getByTestId('add-button') as HTMLButtonElement;

    userEvent.click(button);

    expect(button).toHaveTextContent(JSON.stringify({ propertyId: 1 }));
  });

  it('should update the server if user is logged in', () => {
    const { getByTestId } = render(
      <UserContextModule.UserContext.Provider value={userModelStub()}>
        <MockComponent propertyId={1} apiResponse={{ ok: null }} />
      </UserContextModule.UserContext.Provider>
    );
    const button = getByTestId('add-button') as HTMLButtonElement;

    expect(button).toHaveTextContent('[]');

    userEvent.click(button);

    expect(button).toHaveTextContent(JSON.stringify({ propertyId: 1 }));
    expect(WindowService.localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(WindowService.localStorage.setItem).toHaveBeenCalledWith('my-key', [{ property_id: 1 }]);
    expect(createFetcherMock).toHaveBeenCalledTimes(1);
    expect(createFetcherMock).toHaveBeenCalledWith({
      propertyId: 1,
    });
  });

  it('should remove the property', () => {
    const { getByTestId } = render(
      <MockComponent propertyId={1} apiResponse={{ ok: true, data: [{ propertyId: 1 }], headers: {} as Headers }} />
    );
    const addButton = getByTestId('add-button') as HTMLButtonElement;
    const removeButton = getByTestId('remove-button') as HTMLButtonElement;

    userEvent.click(removeButton);

    expect(addButton).toHaveTextContent('[]');
    expect(removeFetcherMock).not.toHaveBeenCalled();
  });

  it('should remove from the server if user is logged in', () => {
    const { getByTestId } = render(
      <UserContextModule.UserContext.Provider value={userModelStub()}>
        <MockComponent propertyId={1} apiResponse={{ ok: true, data: [{ propertyId: 1 }], headers: {} as Headers }} />
      </UserContextModule.UserContext.Provider>
    );
    const addButton = getByTestId('add-button') as HTMLButtonElement;
    const removeButton = getByTestId('remove-button') as HTMLButtonElement;

    expect(addButton).toHaveTextContent(JSON.stringify({ propertyId: 1 }));

    (WindowService.localStorage.setItem as jest.Mock).mockReset();

    userEvent.click(removeButton);

    expect(addButton).toHaveTextContent('[]');
    expect(WindowService.localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(WindowService.localStorage.setItem).toHaveBeenCalledWith('my-key', []);
    expect(removeFetcherMock).toHaveBeenCalledTimes(1);
    expect(removeFetcherMock).toHaveBeenCalledWith({
      propertyId: 1,
    });
  });

  it('should work without removeFetcher', () => {
    // eslint-disable-next-line react/display-name
    MockComponent = ({ propertyId, apiResponse }): ReactElement => {
      const [userProperties, setUserProperty, removeUserProperty] = useUserPropertyState(
        'my-key',
        apiResponse,
        (item) => item,
        createFetcherMock
      );

      return (
        <>
          <button onClick={(): void => setUserProperty({ propertyId })} data-testid='add-button'>
            {JSON.stringify(userProperties)}
          </button>
          <button onClick={(): void => removeUserProperty({ propertyId })} data-testid='remove-button'>
            Remove it
          </button>
        </>
      );
    };

    const { getByTestId } = render(
      <UserContextModule.UserContext.Provider value={userModelStub()}>
        <MockComponent propertyId={1} apiResponse={{ ok: true, data: [{ propertyId: 1 }], headers: {} as Headers }} />
      </UserContextModule.UserContext.Provider>
    );
    const addButton = getByTestId('add-button') as HTMLButtonElement;
    const removeButton = getByTestId('remove-button') as HTMLButtonElement;

    userEvent.click(removeButton);

    expect(addButton).toHaveTextContent('[]');
    expect(removeFetcherMock).not.toHaveBeenCalled();
  });
});
