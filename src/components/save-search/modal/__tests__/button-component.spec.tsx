/**
 * @jest-environment jsdom
 */

import { act, render, RenderResult, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { mockModalEnv } from 'mocks/modal-env/mock';
import { mockReactUseSwr } from 'mocks/react/use-swr.mock';
import { userModelStub } from 'stubs/user/model.stub';

import { UserContext } from 'context/user/context';
import { UserContextProvider } from 'context/user/context-provider';
import * as OnBoardingComponentModule from 'library/on-boarding/component';
import { AuthService } from 'services/auth/service';
import { AuthSubscribeEventTypeEnum } from 'services/auth/subscribe-event-type.enum';
import { UserModelInterface } from 'services/user/model.interface';
import { WindowService } from 'services/window/service';

import { SaveSearchModalButtonComponent } from '../button-component';

jest.mock('services/window/service');

jest.mock('../content-component', () => ({
  // eslint-disable-next-line react/display-name
  SaveSearchModalContentComponent: ({ close }: { close: () => void }): JSX.Element => (
    <button data-testid='save-search-modal-content-component' onClick={close} />
  ),
}));

jest.mock('components/auth/modal/component', () => ({
  // eslint-disable-next-line react/display-name
  AuthModalComponent: ({ cancel }: { cancel: () => void }): JSX.Element => (
    <button data-testid='auth-modal-component' onClick={cancel} />
  ),
}));

describe('SaveSearchModalButtonComponent', () => {
  beforeEach(() => {
    window.dataLayer = [];
    document.documentElement.scroll = jest.fn();

    mockReactUseSwr('api_user', {
      ok: true,
      data: {},
    });

    mockModalEnv();
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
    let renderResult: RenderResult;

    beforeEach(() => {
      (WindowService.localStorage.getItem as jest.Mock).mockReturnValue(null);

      renderResult = render(
        <UserContextProvider>
          <SaveSearchModalButtonComponent visibleTooltip />
        </UserContextProvider>
      );
    });

    it('should open and close the login dialog', async () => {
      await waitFor(() => userEvent.click(screen.getByText('save-search/cta-label')));

      expect(screen.getByTestId('auth-modal-component')).toBeInTheDocument();

      const authModal = screen.getByTestId('auth-modal-component');
      userEvent.click(authModal);

      expect(authModal).not.toBeInTheDocument();
    });

    it('should open the save search modal when user got logged in', async () => {
      await waitFor(() => userEvent.click(screen.getByText('save-search/cta-label')));

      expect(screen.getByTestId('auth-modal-component')).toBeInTheDocument();

      expect(window.dataLayer).toEqual(
        expect.arrayContaining([
          {
            event: 'customEvent',
            eventAction: 'click',
            eventCategory: 'Saved Search',
          },
        ])
      );

      act(() => {
        AuthService.onAuthResolved(
          {
            user: { userId: '2' } as UserModelInterface,
            meta: { token: '', refresh_token: '' },
          },
          AuthSubscribeEventTypeEnum.login,
          'Facebook'
        );
      });

      expect(window.dataLayer).toEqual(
        expect.arrayContaining([
          {
            event: 'customEvent',
            eventAction: 'signIn',
            eventCategory: 'Saved Search',
          },
        ])
      );
    });

    it('should trigger signUp event when user register while using the save search cta', () => {
      act(() => {
        userEvent.click(renderResult.getByText('save-search/cta-label'));
      });

      expect(window.dataLayer).toEqual(
        expect.not.arrayContaining([
          {
            event: 'customEvent',
            eventAction: 'signUp',
            eventCategory: 'Saved Search',
          },
        ])
      );

      act(() => {
        AuthService.onAuthResolved(
          {
            user: { userId: '3' } as UserModelInterface,
            meta: { token: '', refresh_token: '' },
          },
          AuthSubscribeEventTypeEnum.register,
          'Email'
        );
      });

      expect(window.dataLayer).toEqual(
        expect.arrayContaining([
          {
            event: 'customEvent',
            eventAction: 'signUp',
            eventCategory: 'Saved Search',
          },
        ])
      );
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
