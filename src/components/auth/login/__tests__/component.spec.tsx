/**
 * @jest-environment jsdom
 */
import { fireEvent, render, RenderResult, waitFor } from '@testing-library/react';

import * as AuthLoginServiceModule from 'services/auth/login.service';
import * as GoogleRecaptchaServiceModule from 'services/google/recaptcha.service';
import { AuthFacebookService } from 'services/auth/facebook.service';
import { AuthGoogleService } from 'services/auth/google.service';
import { AuthLoginComponent } from '../component';
import { AuthLoginPropsInterface } from '../props.interface';
import { googleRecaptchaStub } from 'stubs/google/recaptcha.stub';
import { UserModelInterface } from 'services/user/model.interface';

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
    };

    renderResult = render(<AuthLoginComponent {...props} />);
  });

  it('renders without throwing any errors', () => {
    expect(renderResult.container).toMatchSnapshot();
  });

  it('should call onRegister when click on the registration button', () => {
    const registrationButton = renderResult.container.querySelector('.create-account') as HTMLDivElement;

    expect(props.onRegister).not.toHaveBeenCalled();
    fireEvent.click(registrationButton);

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
      const facebookButton = renderResult.container.querySelector('button.facebook') as HTMLButtonElement;

      fireEvent.click(facebookButton);

      await waitFor(() => expect(renderResult.container.querySelector('.loader1')));

      expect(props.onClose).toHaveBeenCalledTimes(1);
      expect(props.onSuccess).toHaveBeenCalledTimes(1);
    });

    it('should handle the error while login with facebook', async () => {
      jest.spyOn(AuthFacebookService, 'signIn').mockReturnValue(Promise.reject());
      const facebookButton = renderResult.container.querySelector('button.facebook') as HTMLButtonElement;

      fireEvent.click(facebookButton);

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
      const googleButton = renderResult.container.querySelector('button.google') as HTMLButtonElement;

      fireEvent.click(googleButton);

      await waitFor(() => expect(renderResult.container.querySelector('.loader1')));

      expect(props.onClose).toHaveBeenCalledTimes(1);
      expect(props.onSuccess).toHaveBeenCalledTimes(1);
    });

    it('should handle the error while login with google', async () => {
      jest.spyOn(AuthGoogleService, 'signIn').mockReturnValue(Promise.reject());
      const googleButton = renderResult.container.querySelector('button.google') as HTMLButtonElement;

      fireEvent.click(googleButton);

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

      const emailInput = renderResult.container.querySelector('input[type=email]') as HTMLInputElement;
      const passwordInput = renderResult.container.querySelector('input[type=password]') as HTMLInputElement;
      const formElem = renderResult.container.querySelector('form') as HTMLFormElement;

      fireEvent.change(emailInput, { target: { value: 'email@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'mypassword' } });

      fireEvent.submit(formElem);

      await waitFor(() => expect(renderResult.container.querySelector('.loader1')));

      expect(googleRecaptchaMock.execute).toHaveBeenCalledTimes(1);
      expect(googleRecaptchaMock.reset).not.toHaveBeenCalled();

      expect(props.onClose).toHaveBeenCalledTimes(1);
      expect(props.onSuccess).toHaveBeenCalledTimes(1);
    });

    it('should not do anything if email is invalid', () => {
      const googleRecaptchaMock = googleRecaptchaStub();
      jest.spyOn(GoogleRecaptchaServiceModule, 'GoogleRecaptchaService').mockReturnValue(googleRecaptchaMock);

      const emailInput = renderResult.container.querySelector('input[type=email]') as HTMLInputElement;
      const passwordInput = renderResult.container.querySelector('input[type=password]') as HTMLInputElement;
      const formElem = renderResult.container.querySelector('form') as HTMLFormElement;

      fireEvent.change(emailInput, { target: { value: 'invalid email' } });
      fireEvent.change(passwordInput, { target: { value: 'mypassword' } });

      fireEvent.submit(formElem);

      expect(googleRecaptchaMock.execute).not.toHaveBeenCalled();
      expect(props.onClose).not.toHaveBeenCalled();
      expect(props.onSuccess).not.toHaveBeenCalled();
    });

    it('should not do anything if password is invalid', () => {
      const googleRecaptchaMock = googleRecaptchaStub();
      jest.spyOn(GoogleRecaptchaServiceModule, 'GoogleRecaptchaService').mockReturnValue(googleRecaptchaMock);

      const emailInput = renderResult.container.querySelector('input[type=email]') as HTMLInputElement;
      const formElem = renderResult.container.querySelector('form') as HTMLFormElement;

      fireEvent.change(emailInput, { target: { value: 'email@example.com' } });

      fireEvent.submit(formElem);

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

      const emailInput = renderResult.container.querySelector('input[type=email]') as HTMLInputElement;
      const passwordInput = renderResult.container.querySelector('input[type=password]') as HTMLInputElement;
      const formElem = renderResult.container.querySelector('form') as HTMLFormElement;

      fireEvent.change(emailInput, { target: { value: 'email@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'mypassword' } });

      fireEvent.submit(formElem);

      await waitFor(() => expect(googleRecaptchaMock.reset).toHaveBeenCalledTimes(1));

      expect(props.onClose).not.toHaveBeenCalled();
      expect(props.onSuccess).not.toHaveBeenCalled();
    });
  });
});
