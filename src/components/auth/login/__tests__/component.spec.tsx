import { render, RenderResult, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { googleRecaptchaStub } from 'stubs/google/recaptcha.stub';
import { userModelStub } from 'stubs/user/model.stub';

import { AuthFacebookService } from 'services/auth/facebook.service';
import { AuthGoogleService } from 'services/auth/google.service';
import * as AuthLoginServiceModule from 'services/auth/login.service';
import * as GoogleRecaptchaServiceModule from 'services/google/recaptcha.service';
import { UserModelInterface } from 'services/user/model.interface';

import { AuthLoginComponent } from '../component';
import { AuthLoginPropsInterface } from '../props.interface';

describe('AuthLoginComponent', () => {
  let props: AuthLoginPropsInterface;
  let renderResult: RenderResult;
  let userModel: UserModelInterface;

  beforeEach(() => {
    props = {
      onClose: jest.fn(),
      onForgotPassword: jest.fn(),
      onRegister: jest.fn(),
      onSuccess: jest.fn(),
      onFacebookLoginStart: jest.fn(),
      onGoogleLoginStart: jest.fn(),
    };

    userModel = userModelStub();

    renderResult = render(<AuthLoginComponent {...props} />);
  });

  it('renders without throwing any errors', () => {
    expect(renderResult.container).toMatchSnapshot();
  });

  it('should call onRegister when click on the registration button', () => {
    const registrationButton = screen.getByText('auth/not-registered-yet?', { exact: false });

    expect(props.onRegister).not.toHaveBeenCalled();
    userEvent.click(registrationButton);

    expect(props.onRegister).toHaveBeenCalledTimes(1);
  });

  describe('Facebook', () => {
    it('should allow to login with facebook', async () => {
      jest.spyOn(AuthFacebookService, 'signIn').mockReturnValue(
        Promise.resolve({
          email: 'email@example.com',
          user: userModel,
          meta: {
            token: 'token',
            refresh_token: 'refresh token',
          },
        })
      );

      userEvent.click(screen.getByRole('button', { name: 'auth/sign-in-facebook' }));

      expect(await screen.findByTestId('auth-loader'));

      expect(props.onClose).toHaveBeenCalledTimes(1);
      expect(props.onSuccess).toHaveBeenCalledTimes(1);
      expect(props.onSuccess).toHaveBeenCalledWith('sign-in-with-facebook', userModel);

      expect(props.onFacebookLoginStart).toHaveBeenCalledTimes(1);
    });

    it('should handle the error while login with facebook', async () => {
      jest.spyOn(AuthFacebookService, 'signIn').mockReturnValue(Promise.reject());
      userEvent.click(screen.getByRole('button', { name: 'auth/sign-in-facebook' }));

      await waitFor(() => expect(props.onClose).toHaveBeenCalledTimes(1));

      expect(props.onSuccess).not.toHaveBeenCalled();
      expect(screen.getByText('auth/something-wrong! auth/try-later')).toBeInTheDocument();
    });
  });

  describe('Google', () => {
    it('should allow to login with google', async () => {
      jest.spyOn(AuthGoogleService, 'signIn').mockReturnValue(
        Promise.resolve({
          email: 'email@example.com',
          user: userModel,
          meta: {
            token: 'token',
            refresh_token: 'refresh token',
          },
        })
      );

      userEvent.click(screen.getByRole('button', { name: 'auth/sign-in-google' }));

      expect(await screen.findByTestId('auth-loader'));

      expect(props.onClose).toHaveBeenCalledTimes(1);
      expect(props.onSuccess).toHaveBeenCalledTimes(1);
      expect(props.onSuccess).toHaveBeenCalledWith('sign-in-with-google', userModel);

      expect(props.onGoogleLoginStart).toHaveBeenCalledTimes(1);
    });

    it('should handle the error while login with google', async () => {
      jest.spyOn(AuthGoogleService, 'signIn').mockReturnValue(Promise.reject());
      userEvent.click(screen.getByRole('button', { name: 'auth/sign-in-google' }));

      await waitFor(() => expect(props.onClose).toHaveBeenCalledTimes(1));

      expect(props.onSuccess).not.toHaveBeenCalled();
      expect(screen.getByText('auth/something-wrong! auth/try-later')).toBeInTheDocument();
    });
  });

  describe('Email/Password', () => {
    it('should successfully sign in', async () => {
      const googleRecaptchaMock = googleRecaptchaStub();
      jest.spyOn(GoogleRecaptchaServiceModule, 'GoogleRecaptchaService').mockReturnValue(googleRecaptchaMock);

      jest.spyOn(AuthLoginServiceModule, 'AuthLoginService').mockReturnValue(
        Promise.resolve({
          ok: true,
          data: userModel,
          headers: {} as Headers,
        })
      );

      userEvent.type(screen.getByLabelText('email'), 'email@example.com');
      userEvent.type(screen.getByLabelText('password'), 'mypassword');
      userEvent.click(screen.getByRole('button', { name: 'log-in' }));

      expect(await screen.findByTestId('auth-loader'));

      expect(googleRecaptchaMock.execute).toHaveBeenCalledTimes(1);
      expect(googleRecaptchaMock.reset).not.toHaveBeenCalled();

      expect(props.onClose).toHaveBeenCalledTimes(1);
      expect(props.onSuccess).toHaveBeenCalledTimes(1);
      expect(props.onSuccess).toHaveBeenCalledWith('sign-in-with-email', userModel);
    });

    it('should not do anything if email is invalid', () => {
      const googleRecaptchaMock = googleRecaptchaStub();
      jest.spyOn(GoogleRecaptchaServiceModule, 'GoogleRecaptchaService').mockReturnValue(googleRecaptchaMock);

      userEvent.type(screen.getByLabelText('email'), 'invalid email');
      userEvent.type(screen.getByLabelText('password'), 'mypassword');
      userEvent.click(screen.getByRole('button', { name: 'log-in' }));

      expect(googleRecaptchaMock.execute).not.toHaveBeenCalled();
      expect(props.onClose).not.toHaveBeenCalled();
      expect(props.onSuccess).not.toHaveBeenCalled();
    });

    it('should not do anything if password is invalid', () => {
      const googleRecaptchaMock = googleRecaptchaStub();
      jest.spyOn(GoogleRecaptchaServiceModule, 'GoogleRecaptchaService').mockReturnValue(googleRecaptchaMock);

      userEvent.type(screen.getByLabelText('email'), 'email@example.com');
      userEvent.click(screen.getByRole('button', { name: 'log-in' }));

      expect(googleRecaptchaMock.execute).not.toHaveBeenCalled();
      expect(props.onClose).not.toHaveBeenCalled();
      expect(props.onSuccess).not.toHaveBeenCalled();
    });

    it('should call reset when there is error in form submit', async () => {
      jest.spyOn(AuthLoginServiceModule, 'AuthLoginService').mockReturnValue(
        Promise.resolve({
          ok: false,
          error: { body: 'This is an error', url: '', status: 500 },
          headers: {} as Headers,
        })
      );

      const googleRecaptchaMock = googleRecaptchaStub();
      jest.spyOn(GoogleRecaptchaServiceModule, 'GoogleRecaptchaService').mockReturnValue(googleRecaptchaMock);

      userEvent.type(screen.getByLabelText('email'), 'email@example.com');
      userEvent.type(screen.getByLabelText('password'), 'mypassword');
      userEvent.click(screen.getByRole('button', { name: 'log-in' }));

      await waitFor(() => expect(googleRecaptchaMock.reset).toHaveBeenCalledTimes(1));

      expect(props.onClose).not.toHaveBeenCalled();
      expect(props.onSuccess).not.toHaveBeenCalled();
      expect(screen.queryByText('auth/something-wrong! auth/try-later')).not.toBeInTheDocument();
      expect(screen.getByText('This is an error')).toBeInTheDocument();
    });

    it('should show custom error when there is no error came from API in form submit', async () => {
      jest.spyOn(AuthLoginServiceModule, 'AuthLoginService').mockReturnValue(
        Promise.resolve({
          ok: false,
          error: { body: '', url: '', status: 500 },
          headers: {} as Headers,
        })
      );

      const googleRecaptchaMock = googleRecaptchaStub();
      jest.spyOn(GoogleRecaptchaServiceModule, 'GoogleRecaptchaService').mockReturnValue(googleRecaptchaMock);

      userEvent.type(screen.getByLabelText('email'), 'email@example.com');
      userEvent.type(screen.getByLabelText('password'), 'mypassword');
      userEvent.click(screen.getByRole('button', { name: 'log-in' }));

      await waitFor(() => expect(googleRecaptchaMock.reset).toHaveBeenCalledTimes(1));

      expect(screen.getByText('auth/something-wrong! auth/try-later')).toBeInTheDocument();
    });
  });
});
