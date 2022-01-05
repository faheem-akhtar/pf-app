import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { googleRecaptchaStub } from 'stubs/google/recaptcha.stub';

import { AuthForgotPasswordComponent } from 'components/auth/forgot-password/component';
import * as AuthResetPasswordServiceModule from 'services/auth/reset-password.service';
import * as GoogleRecaptchaServiceModule from 'services/google/recaptcha.service';

import { AuthForgotPasswordPropsInterface } from '../props.interface';

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

    render(<AuthForgotPasswordComponent {...props} />);
    userEvent.type(screen.getByLabelText('email'), 'email@example.com');
    userEvent.click(screen.getByRole('button', { name: 'auth/reset-password' }));

    expect(await screen.findByTestId('auth-loader'));

    expect(googleRecaptchaMock.execute).toHaveBeenCalledTimes(1);
    expect(googleRecaptchaMock.reset).not.toHaveBeenCalled();

    expect(props.onClose).toHaveBeenCalledTimes(1);
    expect(props.onSuccess).toHaveBeenCalledTimes(1);
  });

  it('should not do anything if email is invalid', () => {
    const googleRecaptchaMock = googleRecaptchaStub();
    jest.spyOn(GoogleRecaptchaServiceModule, 'GoogleRecaptchaService').mockReturnValue(googleRecaptchaMock);

    render(<AuthForgotPasswordComponent {...props} />);
    userEvent.type(screen.getByLabelText('email'), 'invalid email');
    userEvent.click(screen.getByRole('button', { name: 'auth/reset-password' }));

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

    render(<AuthForgotPasswordComponent {...props} />);
    userEvent.type(screen.getByLabelText('email'), 'email@example.com');
    userEvent.click(screen.getByRole('button', { name: 'auth/reset-password' }));

    await waitFor(() => {
      expect(googleRecaptchaMock.reset).toHaveBeenCalledTimes(1);
    });

    expect(props.onClose).not.toHaveBeenCalled();
    expect(props.onSuccess).not.toHaveBeenCalled();

    expect(screen.queryByText('auth/something-wrong! auth/try-later')).not.toBeInTheDocument();
    expect(screen.getByText('This is an error')).toBeInTheDocument();
  });

  it('should show custom error when there is no error came from API in form submit', async () => {
    jest.spyOn(AuthResetPasswordServiceModule, 'AuthResetPasswordService').mockReturnValue(
      Promise.resolve({
        ok: false,
        error: { body: '', url: '', status: 500 },
        headers: {} as Headers,
      })
    );

    const googleRecaptchaMock = googleRecaptchaStub();
    jest.spyOn(GoogleRecaptchaServiceModule, 'GoogleRecaptchaService').mockReturnValue(googleRecaptchaMock);

    render(<AuthForgotPasswordComponent {...props} />);
    userEvent.type(screen.getByLabelText('email'), 'email@example.com');
    userEvent.click(screen.getByRole('button', { name: 'auth/reset-password' }));

    await waitFor(() => {
      expect(googleRecaptchaMock.reset).toHaveBeenCalledTimes(1);
    });

    expect(screen.getByText('auth/something-wrong! auth/try-later')).toBeInTheDocument();
  });
});
