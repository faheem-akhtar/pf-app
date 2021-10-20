/**
 * @jest-environment jsdom
 */
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { mockModalEnv } from 'mocks/modal-env/mock';
import { userModelStub } from 'stubs/user/model.stub';

import { SaveSearchContext } from 'components/save-search/context';
import { UserContext } from 'context/user/context';
import { AuthService } from 'services/auth/service';
import { AuthSubscribeEventTypeEnum } from 'services/auth/subscribe-event-type.enum';

import { SaveSearchModalAuthComponent } from '../component';
import { SaveSearchModalAuthPropsInterface } from '../props.interface';

jest.mock('components/auth/modal/component', () => ({
  // eslint-disable-next-line react/display-name
  AuthModalComponent: ({ cancel }: { cancel: () => void }): JSX.Element => (
    <button data-testid='auth-modal-component' onClick={cancel} />
  ),
}));

describe('SaveSearchModalAuthComponent', () => {
  let props: SaveSearchModalAuthPropsInterface;

  beforeEach(() => {
    window.dataLayer = [];
    document.documentElement.scroll = jest.fn();

    props = {
      onCancel: jest.fn(),
      onSuccess: jest.fn(),
    };

    mockModalEnv();
  });

  it('should call onCancel', () => {
    render(<SaveSearchModalAuthComponent {...props} />);

    userEvent.click(screen.getByTestId('auth-modal-component'));

    expect(props.onCancel).toHaveBeenCalledTimes(1);
  });

  it('should call onSuccess', () => {
    render(
      <SaveSearchContext.Provider
        value={{
          ok: true,
          data: [],
          filtered: [],
          create: jest.fn(),
        }}
      >
        <UserContext.Provider value={userModelStub()}>
          <SaveSearchModalAuthComponent {...props} />
        </UserContext.Provider>
      </SaveSearchContext.Provider>
    );

    expect(props.onSuccess).toHaveBeenCalledTimes(1);
    expect(props.onSuccess).toHaveBeenCalledWith();
  });

  it('should send ga event when user got logged in', () => {
    render(<SaveSearchModalAuthComponent {...props} />);

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

    expect(window.dataLayer).toEqual([
      {
        event: 'customEvent',
        eventAction: 'signIn',
        eventCategory: 'Saved Search',
      },
    ]);
  });

  it('should send ga event when user got register', () => {
    render(<SaveSearchModalAuthComponent {...props} />);

    act(() => {
      AuthService.onAuthResolved(
        {
          user: userModelStub(),
          meta: { token: '', refresh_token: '' },
        },
        AuthSubscribeEventTypeEnum.register,
        'Email'
      );
    });

    expect(window.dataLayer).toEqual([
      {
        event: 'customEvent',
        eventAction: 'signUp',
        eventCategory: 'Saved Search',
      },
    ]);
  });
});
