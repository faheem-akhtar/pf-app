/**
 * @jest-environment jsdom
 */
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as AuthForgotPasswordComponentModule from 'components/auth/forgot-password/component';
import * as AuthLoginComponentModule from 'components/auth/login/component';
import * as AuthRegistrationComponentModule from 'components/auth/registration/component';
import { AuthScreenEnum } from 'components/auth/screen.enum';
import { AuthSuccessTypeEnum } from 'components/auth/success-type.enum';
import { SavedPropertyAuthLoginTemplate } from 'components/saved-property/auth/login/template';

import { AuthModalComponent } from '../component';
import { AuthModalPropsInterface } from '../props.interface';

describe('AuthModalComponent', () => {
  let props: AuthModalPropsInterface;

  beforeEach(() => {
    window.dataLayer = [];
    props = {
      close: jest.fn(),
      cancel: jest.fn(),
      success: jest.fn(),
    };
  });

  it('renders without throwing any errors', () => {
    expect(render(<AuthModalComponent {...props} />).container).toMatchSnapshot();
  });

  it('should accept an event label', () => {
    render(<AuthModalComponent {...props} eventLabel='event label' />);

    expect(window.dataLayer).toEqual([
      {
        event: 'Userbox',
        eventAction: 'Click:Sign in Button',
        eventLabel: 'event label',
      },
    ]);
  });

  describe('login screen', () => {
    beforeEach(() => {
      render(<AuthModalComponent {...props} />);

      window.dataLayer = [];
    });

    it('should render login by default', () => {
      expect(screen.getByRole('heading', { level: 1, name: 'sign-in' })).toBeInTheDocument();
    });

    it('should display registration screen', async () => {
      userEvent.click(screen.getByText('auth/not-registered-yet', { exact: false }));

      expect(screen.getByRole('heading', { level: 1, name: 'auth/create-account' })).toBeInTheDocument();

      await waitFor(() => {
        expect(window.dataLayer).toEqual([
          {
            event: 'Userbox',
            eventAction: 'Start:Sign up with Email',
            eventLabel: 'Header',
          },
        ]);
      });
    });

    it('should display forgot password screen', async () => {
      userEvent.click(screen.getByText('auth/forgot-password?'));
      expect(screen.getByRole('heading', { level: 1, name: 'auth/forgot-password?' })).toBeInTheDocument();

      await waitFor(() => {
        expect(window.dataLayer).toEqual([
          {
            event: 'Userbox',
            eventAction: 'Start:Password Reset',
            eventLabel: 'Header',
          },
        ]);
      });
    });

    it('should call close', () => {
      jest
        .spyOn(AuthLoginComponentModule, 'AuthLoginComponent')
        .mockImplementationOnce(({ onClose }) => <button data-testid='close-button' onClick={onClose} />);
      render(<AuthModalComponent {...props} />);

      userEvent.click(screen.getByTestId('close-button'));
      expect(props.close).toHaveBeenCalledTimes(1);
    });

    it('should call close on header', () => {
      userEvent.click(screen.getByRole('button', { name: /cross/i }));
      expect(props.close).toHaveBeenCalledTimes(1);
    });

    it('should call success', () => {
      jest
        .spyOn(AuthLoginComponentModule, 'AuthLoginComponent')
        .mockImplementationOnce(({ onSuccess }) => (
          <button data-testid='my-button' onClick={(): void => onSuccess(AuthSuccessTypeEnum.signInWithEmail)} />
        ));
      render(<AuthModalComponent {...props} />);

      window.dataLayer = [];

      userEvent.click(screen.getByTestId('my-button'));

      expect(props.success).toHaveBeenCalledTimes(1);

      expect(window.dataLayer).toEqual([
        {
          event: 'Userbox',
          eventAction: 'Finish:Sign in with email',
          eventLabel: 'Header',
        },
      ]);
    });

    it('should track success sign in with facebook', () => {
      jest
        .spyOn(AuthLoginComponentModule, 'AuthLoginComponent')
        .mockImplementationOnce(({ onSuccess }) => (
          <button data-testid='my-button' onClick={(): void => onSuccess(AuthSuccessTypeEnum.signInWithFacebook)} />
        ));
      render(<AuthModalComponent {...props} />);

      window.dataLayer = [];

      userEvent.click(screen.getByTestId('my-button'));

      expect(window.dataLayer).toEqual([
        {
          event: 'Userbox',
          eventAction: 'Finish:Sign in with facebook',
          eventLabel: 'Header',
        },
      ]);
    });

    it('should track success sign in with google', () => {
      jest
        .spyOn(AuthLoginComponentModule, 'AuthLoginComponent')
        .mockImplementationOnce(({ onSuccess }) => (
          <button data-testid='my-button' onClick={(): void => onSuccess(AuthSuccessTypeEnum.signInWithGoogle)} />
        ));
      render(<AuthModalComponent {...props} />);

      window.dataLayer = [];

      userEvent.click(screen.getByTestId('my-button'));

      expect(window.dataLayer).toEqual([
        {
          event: 'Userbox',
          eventAction: 'Finish:Sign in with google',
          eventLabel: 'Header',
        },
      ]);
    });
  });

  describe('short login screen', () => {
    beforeEach(() => {
      render(
        <AuthModalComponent
          {...props}
          initialScreen={AuthScreenEnum.shortLogin}
          loginTemplate={SavedPropertyAuthLoginTemplate}
        />
      );
    });

    it('should render the short login screen', () => {
      expect(screen.getByRole('heading', { level: 1, name: 'saved_property/auth-login-title' })).toBeInTheDocument();
    });

    it('should switch to default login screen', () => {
      userEvent.click(screen.getByText('log-in'));

      expect(screen.getByRole('heading', { level: 1, name: 'sign-in' })).toBeInTheDocument();
    });

    ['google', 'facebook'].forEach((platform) => {
      it(`should track "start sign in with ${platform}" event`, () => {
        userEvent.click(screen.getByRole('button', { name: `auth/sign-in-${platform}` }));

        expect(window.dataLayer).toEqual([
          {
            event: 'Userbox',
            eventAction: `Start:Sign in with ${platform}`,
            eventLabel: 'Header',
          },
        ]);
      });
    });
  });

  describe('registration screen', () => {
    it('should switch to login screen', () => {
      render(<AuthModalComponent {...props} initialScreen={AuthScreenEnum.registration} />);
      userEvent.click(screen.getByText('auth/already-registered? log-in'));

      expect(screen.getByRole('heading', { level: 1, name: 'sign-in' })).toBeInTheDocument();
    });

    it('should call close', () => {
      jest
        .spyOn(AuthRegistrationComponentModule, 'AuthRegistrationComponent')
        .mockImplementationOnce(({ onClose }) => <button data-testid='my-button' onClick={onClose} />);

      render(<AuthModalComponent {...props} initialScreen={AuthScreenEnum.registration} />);

      userEvent.click(screen.getByTestId('my-button'));
      expect(props.close).toHaveBeenCalledTimes(1);
    });

    it('should call success', () => {
      jest
        .spyOn(AuthRegistrationComponentModule, 'AuthRegistrationComponent')
        .mockImplementationOnce(({ onSuccess }) => (
          <button data-testid='my-button' onClick={(): void => onSuccess(AuthSuccessTypeEnum.registerWithEmail)} />
        ));
      render(<AuthModalComponent {...props} initialScreen={AuthScreenEnum.registration} />);

      userEvent.click(screen.getByTestId('my-button'));
      expect(props.success).toHaveBeenCalledTimes(1);
    });
  });

  describe('forgot password screen', () => {
    it('should switch to registration screen', () => {
      render(<AuthModalComponent {...props} initialScreen={AuthScreenEnum.forgotPassword} />);

      userEvent.click(screen.getByText('auth/not-registered-yet? auth/create-account'));

      expect(screen.getByRole('heading', { level: 1, name: 'auth/create-account' })).toBeInTheDocument();
    });

    it('should call close', () => {
      jest
        .spyOn(AuthForgotPasswordComponentModule, 'AuthForgotPasswordComponent')
        .mockImplementationOnce(({ onClose }) => <button data-testid='my-button' onClick={onClose} />);

      render(<AuthModalComponent {...props} initialScreen={AuthScreenEnum.forgotPassword} />);

      userEvent.click(screen.getByTestId('my-button'));
      expect(props.close).toHaveBeenCalledTimes(1);
    });

    it('should call success', () => {
      jest
        .spyOn(AuthForgotPasswordComponentModule, 'AuthForgotPasswordComponent')
        .mockImplementationOnce(({ onSuccess }) => <button data-testid='my-button' onClick={onSuccess} />);

      render(<AuthModalComponent {...props} initialScreen={AuthScreenEnum.forgotPassword} />);

      userEvent.click(screen.getByTestId('my-button'));
      expect(props.success).toHaveBeenCalledTimes(1);
    });
  });
});
