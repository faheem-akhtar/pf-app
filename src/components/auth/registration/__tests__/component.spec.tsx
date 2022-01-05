import { render, RenderResult, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { googleRecaptchaStub } from 'stubs/google/recaptcha.stub';
import { userModelStub } from 'stubs/user/model.stub';

import * as AuthRegisterServiceModule from 'services/auth/register.service';
import { GoogleRecaptcha } from 'services/google/recaptcha';
import * as GoogleRecaptchaServiceModule from 'services/google/recaptcha.service';

import { AuthRegistrationComponent } from '../component';
import { AuthRegistrationPropsInterface } from '../props.interface';

describe('AuthRegistrationComponent', () => {
  let props: AuthRegistrationPropsInterface;
  let renderResult: RenderResult;
  let googleRecaptchaMock: GoogleRecaptcha;

  beforeEach(() => {
    props = {
      onClose: jest.fn(),
      onLogin: jest.fn(),
      onSuccess: jest.fn(),
    };

    googleRecaptchaMock = googleRecaptchaStub('my token');
    jest.spyOn(GoogleRecaptchaServiceModule, 'GoogleRecaptchaService').mockReturnValue(googleRecaptchaMock);

    renderResult = render(<AuthRegistrationComponent {...props} />);
  });

  it('renders without throwing any errors', () => {
    expect(renderResult.container).toMatchSnapshot();
  });

  it('should call onLogin when click on the login', () => {
    userEvent.click(screen.getByText('auth/already-registered', { exact: false }));
    expect(props.onLogin).toHaveBeenCalledTimes(1);
  });

  it('should successfully register the user', async () => {
    const AuthRegisterServiceMock = jest.spyOn(AuthRegisterServiceModule, 'AuthRegisterService').mockReturnValue(
      Promise.resolve({
        ok: true,
        data: userModelStub(),
        headers: {} as Headers,
      })
    );

    userEvent.type(screen.getByLabelText('auth/first-name'), 'first name');
    userEvent.type(screen.getByLabelText('auth/last-name'), 'last name');
    userEvent.type(screen.getByLabelText('email'), 'email@example.com');
    userEvent.type(screen.getByLabelText('password'), 'password');

    userEvent.click(screen.getByRole('button', { name: 'auth/create-account' }));

    expect(await screen.findByTestId('auth-loader'));

    expect(googleRecaptchaMock.execute).toHaveBeenCalledTimes(1);
    expect(googleRecaptchaMock.reset).not.toHaveBeenCalled();

    expect(props.onClose).toHaveBeenCalledTimes(1);
    expect(props.onSuccess).toHaveBeenCalledTimes(1);

    expect(AuthRegisterServiceMock).toHaveBeenCalledTimes(1);
    expect(AuthRegisterServiceMock).toHaveBeenLastCalledWith({
      email: 'email@example.com',
      password: 'password',
      first_name: 'first name',
      last_name: 'last name',
      opted_in: false,
      captcha_token: 'my token',
    });

    AuthRegisterServiceMock.mockReset();
  });

  it('should not do anything if email is invalid', () => {
    userEvent.type(screen.getByLabelText('auth/first-name'), 'first name');
    userEvent.type(screen.getByLabelText('auth/last-name'), 'last name');
    userEvent.type(screen.getByLabelText('email'), 'in valid email');
    userEvent.type(screen.getByLabelText('password'), 'password');

    userEvent.click(screen.getByRole('button', { name: 'auth/create-account' }));

    expect(googleRecaptchaMock.execute).not.toHaveBeenCalled();
    expect(props.onClose).not.toHaveBeenCalled();
    expect(props.onSuccess).not.toHaveBeenCalled();
  });

  it('should call reset when there is error in form submit', async () => {
    const AuthRegisterServiceMock = jest.spyOn(AuthRegisterServiceModule, 'AuthRegisterService').mockReturnValue(
      Promise.resolve({
        ok: false,
        error: { body: 'This is an error', url: '', status: 500 },
        headers: {} as Headers,
      })
    );

    userEvent.type(screen.getByLabelText('auth/first-name'), 'first name');
    userEvent.type(screen.getByLabelText('auth/last-name'), 'last name');
    userEvent.type(screen.getByLabelText('email'), 'email@example.com');
    userEvent.type(screen.getByLabelText('password'), 'password');

    userEvent.click(screen.getByRole('button', { name: 'auth/create-account' }));

    await waitFor(() => expect(googleRecaptchaMock.reset).toHaveBeenCalledTimes(1));

    expect(props.onClose).not.toHaveBeenCalled();
    expect(props.onSuccess).not.toHaveBeenCalled();

    expect(screen.queryByText('auth/something-wrong! auth/try-later')).not.toBeInTheDocument();
    expect(screen.getByText('This is an error')).toBeInTheDocument();

    AuthRegisterServiceMock.mockReset();
  });

  it('should show custom error when there is no error came from API in form submit', async () => {
    const AuthRegisterServiceMock = jest.spyOn(AuthRegisterServiceModule, 'AuthRegisterService').mockReturnValue(
      Promise.resolve({
        ok: false,
        error: { body: '', url: '', status: 500 },
        headers: {} as Headers,
      })
    );

    userEvent.type(screen.getByLabelText('auth/first-name'), 'first name');
    userEvent.type(screen.getByLabelText('auth/last-name'), 'last name');
    userEvent.type(screen.getByLabelText('email'), 'email@example.com');
    userEvent.type(screen.getByLabelText('password'), 'password');

    userEvent.click(screen.getByRole('button', { name: 'auth/create-account' }));

    await waitFor(() => expect(googleRecaptchaMock.reset).toHaveBeenCalledTimes(1));

    expect(props.onClose).not.toHaveBeenCalled();
    expect(props.onSuccess).not.toHaveBeenCalled();

    expect(screen.getByText('auth/something-wrong! auth/try-later')).toBeInTheDocument();

    AuthRegisterServiceMock.mockReset();
  });

  it('should set opted in true from the checkbox', async () => {
    const AuthRegisterServiceMock = jest.spyOn(AuthRegisterServiceModule, 'AuthRegisterService').mockReturnValue(
      Promise.resolve({
        ok: true,
        data: userModelStub(),
        headers: {} as Headers,
      })
    );

    const optedInCheckbox = screen.getByRole('checkbox', { name: 'auth/free-guides' });

    userEvent.type(screen.getByLabelText('auth/first-name'), 'first name');
    userEvent.type(screen.getByLabelText('auth/last-name'), 'last name');
    userEvent.type(screen.getByLabelText('email'), 'email@example.com');
    userEvent.type(screen.getByLabelText('password'), 'password');

    expect(optedInCheckbox).not.toBeChecked();
    userEvent.click(optedInCheckbox);
    expect(optedInCheckbox).toBeChecked();

    userEvent.click(screen.getByRole('button', { name: 'auth/create-account' }));

    await waitFor(() => expect(AuthRegisterServiceMock).toHaveBeenCalledTimes(1));

    expect(AuthRegisterServiceMock).toHaveBeenLastCalledWith({
      email: 'email@example.com',
      password: 'password',
      first_name: 'first name',
      last_name: 'last name',
      opted_in: true,
      captcha_token: 'my token',
    });

    AuthRegisterServiceMock.mockReset();
  });
});
