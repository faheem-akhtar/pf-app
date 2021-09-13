/**
 * @jest-environment jsdom
 */
import { fireEvent, render, waitFor } from '@testing-library/react';

import * as AuthResetPasswordServiceModule from 'services/auth/reset-password.service';
import * as GoogleRecaptchaServiceModule from 'services/google/recaptcha.service';
import { AuthForgotPasswordComponent } from 'components/auth/forgot-password/component';
import { AuthForgotPasswordPropsInterface } from '../props.interface';
import { googleRecaptchaStub } from 'stubs/google/recaptcha.stub';

describe('AuthForgotPasswordComponent', () => {
  let props: AuthForgotPasswordPropsInterface;

  beforeEach(() => {
    props = {
      onClose: jest.fn(),
      onRegister: jest.fn(),
      onSuccess: jest.fn(),
    };
  });

  it('renders without throwing any errors', () => {
    const { container } = render(<AuthForgotPasswordComponent {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should submit the form successfully', async () => {
    jest.spyOn(AuthResetPasswordServiceModule, 'AuthResetPasswordService').mockReturnValue(
      Promise.resolve({
        ok: true,
        data: { email: '', captcha_token: '' },
        headers: {} as Headers,
      })
    );

    const googleRecaptchaMock = googleRecaptchaStub();
    jest.spyOn(GoogleRecaptchaServiceModule, 'GoogleRecaptchaService').mockReturnValue(googleRecaptchaMock);

    const { container } = render(<AuthForgotPasswordComponent {...props} />);
    const emailInput = container.querySelector('input[type=email]') as HTMLInputElement;
    const formElem = container.querySelector('form') as HTMLFormElement;

    fireEvent.change(emailInput, { target: { value: 'email@example.com' } });

    fireEvent.submit(formElem);

    await waitFor(() => expect(container.querySelector('.loader1')));

    expect(googleRecaptchaMock.execute).toHaveBeenCalledTimes(1);
    expect(googleRecaptchaMock.reset).not.toHaveBeenCalled();

    expect(props.onClose).toHaveBeenCalledTimes(1);
    expect(props.onSuccess).toHaveBeenCalledTimes(1);
  });

  it('should not do anything if email is invalid', () => {
    const googleRecaptchaMock = googleRecaptchaStub();
    jest.spyOn(GoogleRecaptchaServiceModule, 'GoogleRecaptchaService').mockReturnValue(googleRecaptchaMock);

    const { container } = render(<AuthForgotPasswordComponent {...props} />);
    const emailInput = container.querySelector('input[type=email]') as HTMLInputElement;
    const formElem = container.querySelector('form') as HTMLFormElement;

    fireEvent.change(emailInput, { target: { value: 'invalid email' } });

    fireEvent.submit(formElem);

    expect(googleRecaptchaMock.execute).not.toHaveBeenCalled();
    expect(props.onClose).not.toHaveBeenCalled();
    expect(props.onSuccess).not.toHaveBeenCalled();
  });

  it('should call reset while there is error in form submit', async () => {
    jest.spyOn(AuthResetPasswordServiceModule, 'AuthResetPasswordService').mockReturnValue(
      Promise.resolve({
        ok: false,
        error: { body: 'This is an error', url: '', status: 500 },
        headers: {} as Headers,
      })
    );

    const googleRecaptchaMock = googleRecaptchaStub();
    jest.spyOn(GoogleRecaptchaServiceModule, 'GoogleRecaptchaService').mockReturnValue(googleRecaptchaMock);

    const { container } = render(<AuthForgotPasswordComponent {...props} />);
    const emailInput = container.querySelector('input[type=email]') as HTMLInputElement;
    const formElem = container.querySelector('form') as HTMLFormElement;

    fireEvent.change(emailInput, { target: { value: 'email@example.com' } });

    fireEvent.submit(formElem);

    await waitFor(() => expect(googleRecaptchaMock.reset).toHaveBeenCalledTimes(1));

    expect(props.onClose).not.toHaveBeenCalled();
    expect(props.onSuccess).not.toHaveBeenCalled();
  });
});
