/**
 * @jest-environment jsdom
 */
import { render, RenderResult, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { googleRecaptchaStub } from 'stubs/google/recaptcha.stub';

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
  const mockUser = {
    first_name: 'first name',
    last_name: 'last name',
    email: 'email@example.com',
    image: '',
    userId: '1',
  } as UserModelInterface;

  beforeEach(() => {
    props = {
      onClose: jest.fn(),
      onForgotPassword: jest.fn(),
      onRegister: jest.fn(),
      onSuccess: jest.fn(),
      onFacebookLoginStart: jest.fn(),
      onGoogleLoginStart: jest.fn(),
    };

    renderResult = render(<AuthLoginComponent {...props} />);
  });

  it('renders without throwing any errors', () => {
    expect(renderResult.container).toMatchSnapshot();
  });

  it('should call onRegister when click on the registration button', () => {
    const registrationButton = renderResult.container.querySelector('.create-account') as HTMLDivElement;

    expect(props.onRegister).not.toHaveBeenCalled();
    userEvent.click(registrationButton);

    expect(props.onRegister).toHaveBeenCalledTimes(1);
  });

  describe('Facebook', () => {
    it('should allow to login with facebook', async () => {
      jest.spyOn(AuthFacebookService, 'signIn').mockReturnValue(
        Promise.resolve({
          email: 'email@example.com',
          user: mockUser,
          meta: {
            token: 'token',
            refresh_token: 'refresh token',
          },
        })
      );

      userEvent.click(screen.getByRole('button', { name: 'auth/sign-in-facebook' }));

      await waitFor(() => expect(renderResult.container.querySelector('.loader1')));

      expect(props.onClose).toHaveBeenCalledTimes(1);
      expect(props.onSuccess).toHaveBeenCalledTimes(1);
      expect(props.onSuccess).toHaveBeenCalledWith('sign-in-with-facebook');

      expect(props.onFacebookLoginStart).toHaveBeenCalledTimes(1);
    });

    it('should handle the error while login with facebook', async () => {
      jest.spyOn(AuthFacebookService, 'signIn').mockReturnValue(Promise.reject());
      userEvent.click(screen.getByRole('button', { name: 'auth/sign-in-facebook' }));

      await waitFor(() => expect(props.onClose).toHaveBeenCalledTimes(1));

      expect(props.onSuccess).not.toHaveBeenCalled();
      expect(renderResult.findByText('auth/something-wrong! auth/try-later')).toBeTruthy();
    });
  });

  describe('Google', () => {
    it('should allow to login with google', async () => {
      jest.spyOn(AuthGoogleService, 'signIn').mockReturnValue(
        Promise.resolve({
          email: 'email@example.com',
          user: {
            first_name: 'first name',
            last_name: 'last name',
            email: 'email@example.com',
            image: '',
            userId: '1',
          },
          meta: {
            token: 'token',
            refresh_token: 'refresh token',
          },
        })
      );

      userEvent.click(screen.getByRole('button', { name: 'auth/sign-in-google' }));

      await waitFor(() => expect(renderResult.container.querySelector('.loader1')));

      expect(props.onClose).toHaveBeenCalledTimes(1);
      expect(props.onSuccess).toHaveBeenCalledTimes(1);
      expect(props.onSuccess).toHaveBeenCalledWith('sign-in-with-google');

      expect(props.onGoogleLoginStart).toHaveBeenCalledTimes(1);
    });

    it('should handle the error while login with google', async () => {
      jest.spyOn(AuthGoogleService, 'signIn').mockReturnValue(Promise.reject());
      userEvent.click(screen.getByRole('button', { name: 'auth/sign-in-google' }));

      await waitFor(() => expect(props.onClose).toHaveBeenCalledTimes(1));

      expect(props.onSuccess).not.toHaveBeenCalled();
      expect(renderResult.findByText('auth/something-wrong! auth/try-later')).toBeTruthy();
    });
  });

  describe('Email/Password', () => {
    it('should successfully sign in', async () => {
      const googleRecaptchaMock = googleRecaptchaStub();
      jest.spyOn(GoogleRecaptchaServiceModule, 'GoogleRecaptchaService').mockReturnValue(googleRecaptchaMock);

      jest.spyOn(AuthLoginServiceModule, 'AuthLoginService').mockReturnValue(
        Promise.resolve({
          ok: true,
          data: mockUser,
          headers: {} as Headers,
        })
      );

      userEvent.type(screen.getByLabelText('email'), 'email@example.com');
      userEvent.type(screen.getByLabelText('password'), 'mypassword');
      userEvent.click(screen.getByRole('button', { name: 'log-in' }));

      await waitFor(() => expect(renderResult.container.querySelector('.loader1')));

      expect(googleRecaptchaMock.execute).toHaveBeenCalledTimes(1);
      expect(googleRecaptchaMock.reset).not.toHaveBeenCalled();

      expect(props.onClose).toHaveBeenCalledTimes(1);
      expect(props.onSuccess).toHaveBeenCalledTimes(1);
      expect(props.onSuccess).toHaveBeenCalledWith('sign-in-with-email');
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
    });
  });
});
