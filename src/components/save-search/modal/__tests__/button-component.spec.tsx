import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { ReactElement } from 'react';

import { mockModalEnv } from 'mocks/modal-env/mock';
import { mockReactUseSwr } from 'mocks/react/use-swr.mock';
import { mockSnackbarEnv } from 'mocks/snackbar/env.mock';
import { saveSearchDataStub } from 'stubs/save-search/data.stub';
import { userModelStub } from 'stubs/user/model.stub';

import { SaveSearchContext } from 'components/save-search/context';
import { SaveSearchInterface } from 'components/save-search/interface';
import { SnackbarContextProvider } from 'components/snackbar/context-provider';
import { UserContext } from 'components/user/context';
import { UserContextProvider } from 'components/user/context-provider';
import * as OnBoardingComponentModule from 'library/on-boarding/component';
import { AuthService } from 'services/auth/service';
import { AuthSubscribeEventTypeEnum } from 'services/auth/subscribe-event-type.enum';
import { WindowService } from 'services/window/service';

import { SaveSearchModalAuthPropsInterface } from '../auth/props.interface';
import { SaveSearchModalButtonComponent } from '../button-component';

jest.mock('services/window/service');

jest.mock('../content-component', () => ({
  // eslint-disable-next-line react/display-name
  SaveSearchModalContentComponent: ({ close }: { close: () => void }): JSX.Element => (
    <button data-testid='save-search-modal-content-component' onClick={close} />
  ),
}));

jest.mock('../auth/component', () => ({
  // eslint-disable-next-line react/display-name
  SaveSearchModalAuthComponent: (props: SaveSearchModalAuthPropsInterface): JSX.Element => (
    <>
      <button data-testid='auth-modal-cancel' onClick={props.onCancel} />
      <button data-testid='auth-modal-success' onClick={props.onSuccess} />
    </>
  ),
}));

describe('SaveSearchModalButtonComponent', () => {
  beforeEach(() => {
    window.dataLayer = [];

    mockReactUseSwr('api_user', {
      ok: true,
      data: {},
    });

    mockModalEnv();
    mockSnackbarEnv();
  });

  it('should render the component', () => {
    expect(render(<SaveSearchModalButtonComponent visibleTooltip />).container).toMatchSnapshot();
  });

  describe('customer', () => {
    beforeEach(() => {
      render(
        <UserContext.Provider value={userModelStub()}>
          <SaveSearchModalButtonComponent visibleTooltip />
        </UserContext.Provider>
      );
    });

    it('should open and close the save search modal when clicked on the cta', async () => {
      await waitFor(() => userEvent.click(screen.getByText('save-search/cta-label')));

      expect(screen.getByTestId('save-search-modal-content-component')).toBeInTheDocument();

      await waitFor(() => userEvent.click(screen.getByTestId('save-search-modal-content-component')));

      expect(screen.queryByTestId('save-search-modal-content-component')).not.toBeInTheDocument();
    });
  });

  describe('guest', () => {
    beforeEach(() => {
      (WindowService.localStorage.getItem as jest.Mock).mockReturnValue(null);
    });

    it('should open and close the login dialog', async () => {
      render(
        <UserContextProvider>
          <SaveSearchModalButtonComponent visibleTooltip />
        </UserContextProvider>
      );

      await waitFor(() => userEvent.click(screen.getByText('save-search/cta-label')));

      const cancelButton = screen.getByTestId('auth-modal-cancel');

      expect(cancelButton).toBeInTheDocument();

      userEvent.click(cancelButton);

      expect(cancelButton).not.toBeInTheDocument();
    });

    it('should open the save search modal when user got logged in', async () => {
      render(
        <UserContextProvider>
          <SaveSearchModalButtonComponent visibleTooltip />
        </UserContextProvider>
      );

      await waitFor(() => userEvent.click(screen.getByText('save-search/cta-label')));

      expect(window.dataLayer).toEqual(
        expect.arrayContaining([
          {
            event: 'customEvent',
            eventAction: 'click',
            eventCategory: 'Saved Search',
          },
        ])
      );

      const successButton = screen.getByTestId('auth-modal-success');

      act(() => {
        AuthService.onAuthResolved(
          {
            user: userModelStub(),
            meta: { token: '', refresh_token: '' },
          },
          AuthSubscribeEventTypeEnum.login,
          'Facebook'
        );
      });

      userEvent.click(successButton);

      expect(successButton).not.toBeInTheDocument();

      expect(screen.getByTestId('save-search-modal-content-component')).toBeInTheDocument();
    });

    it('should display an alert message when user try to save already saved search', async () => {
      const renderComponent = (filteredData: SaveSearchInterface[] = []): ReactElement => (
        <UserContextProvider>
          <SnackbarContextProvider>
            <SaveSearchContext.Provider
              value={{
                ok: true,
                data: [],
                filtered: filteredData,
                create: jest.fn(),
              }}
            >
              <SaveSearchModalButtonComponent visibleTooltip />
            </SaveSearchContext.Provider>
          </SnackbarContextProvider>
        </UserContextProvider>
      );
      const { rerender } = render(renderComponent());

      await waitFor(() => userEvent.click(screen.getByText('save-search/cta-label')));

      const successButton = screen.getByTestId('auth-modal-success');

      act(() => {
        AuthService.onAuthResolved(
          {
            user: userModelStub(),
            meta: { token: '', refresh_token: '' },
          },
          AuthSubscribeEventTypeEnum.login,
          'Facebook'
        );
      });

      rerender(renderComponent([saveSearchDataStub()]));

      await waitFor(() => userEvent.click(screen.getByText('save-search/cta-label_active')));

      userEvent.click(successButton);

      expect(successButton).not.toBeInTheDocument();

      await waitFor(() => screen.findByText('save_search/exist-notification'));
      await waitFor(() => screen.findByText('save_search/manage-cta-label'));
    });
  });

  it('should send tooltip open and close events on tooltip close', () => {
    jest.spyOn(OnBoardingComponentModule, 'OnBoardingComponent').mockImplementationOnce((props) => (
      <button onClick={props.onClose} data-testid='tooltip-close-button'>
        children
      </button>
    ));

    const { getByTestId } = render(<SaveSearchModalButtonComponent visibleTooltip />);

    userEvent.click(getByTestId('tooltip-close-button'));

    expect(window.dataLayer).toEqual([
      {
        event: 'customEvent',
        eventAction: 'Onboarding - Tooltip - Impression',
        eventCategory: 'Onboarding',
        eventLabel: 'Property Serp - Onboarding - Tooltip - Impression - save-search-tooltip',
      },
      {
        event: 'customEvent',
        eventAction: 'Onboarding - Tooltip - Close',
        eventCategory: 'Onboarding',
        eventLabel: 'Property Serp - Onboarding - Tooltip - Close - save-search-tooltip - Auto',
      },
    ]);
  });
});
