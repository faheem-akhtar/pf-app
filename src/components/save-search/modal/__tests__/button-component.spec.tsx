/**
 * @jest-environment jsdom
 */

import { act, render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { mockModalEnv } from 'mocks/modal-env/mock';
import { mockReactUseSwr } from 'mocks/react/use-swr.mock';
import { userModelStub } from 'stubs/user/model.stub';

import { UserContext } from 'context/user/context';
import { UserContextProvider } from 'context/user/context-provider';
import { AuthService } from 'services/auth/service';
import { AuthSubscribeEventTypeEnum } from 'services/auth/subscribe-event-type.enum';
import { UserModelInterface } from 'services/user/model.interface';
import { WindowService } from 'services/window/service';
import { AnalyticsGaEventType } from 'types/analytics/ga/event.type';

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
    (global as unknown as { dataLayer: AnalyticsGaEventType[] }).dataLayer = [];
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
    let renderResult: RenderResult;

    beforeEach(() => {
      renderResult = render(
        <UserContext.Provider value={userModelStub()}>
          <SaveSearchModalButtonComponent visibleTooltip />
        </UserContext.Provider>
      );
    });

    it('should open and close the save search modal when clicked on the cta', () => {
      act(() => {
        userEvent.click(renderResult.getByText('save-search/cta-label'));
      });

      expect(renderResult.queryByTestId('save-search-modal-content-component')).toBeInTheDocument();

      act(() => {
        userEvent.click(renderResult.getByTestId('save-search-modal-content-component'));
      });

      expect(renderResult.queryByTestId('save-search-modal-content-component')).not.toBeInTheDocument();
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

    it('should open and close the login dialog', () => {
      act(() => {
        userEvent.click(renderResult.getByText('save-search/cta-label'));
      });

      expect(renderResult.queryByTestId('auth-modal-component')).toBeInTheDocument();

      act(() => {
        userEvent.click(renderResult.getByTestId('auth-modal-component'));
      });

      expect(renderResult.queryByTestId('auth-modal-component')).not.toBeInTheDocument();
    });

    it('should open the save search modal when user got logged in', () => {
      act(() => {
        userEvent.click(renderResult.getByText('save-search/cta-label'));
      });

      expect(renderResult.queryByTestId('auth-modal-component')).toBeInTheDocument();

      expect((global as unknown as { dataLayer: AnalyticsGaEventType[] }).dataLayer).toEqual(
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
          AuthSubscribeEventTypeEnum.login
        );
      });

      expect((global as unknown as { dataLayer: AnalyticsGaEventType[] }).dataLayer).toEqual(
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

      expect((global as unknown as { dataLayer: AnalyticsGaEventType[] }).dataLayer).toEqual(
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
          AuthSubscribeEventTypeEnum.register
        );
      });

      expect((global as unknown as { dataLayer: AnalyticsGaEventType[] }).dataLayer).toEqual(
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
});
