/**
 * @jest-environment jsdom
 */
import { fireEvent, render, RenderResult, waitFor } from '@testing-library/react';

import * as AuthRegisterServiceModule from 'services/auth/register.service';
import * as GoogleRecaptchaServiceModule from 'services/google/recaptcha.service';
import { AuthRegistrationComponent } from '../component';
import { AuthRegistrationPropsInterface } from '../props.interface';
import { GoogleRecaptcha } from 'services/google/recaptcha';
import { googleRecaptchaStub } from 'stubs/google/recaptcha.stub';
import { UserModelInterface } from 'services/user/model.interface';

describe('AuthRegistrationComponent', () => {
  let props: AuthRegistrationPropsInterface;
  let renderResult: RenderResult;
  let googleRecaptchaMock: GoogleRecaptcha;
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
    fireEvent.click(renderResult.container.querySelector('.link.create-account') as HTMLDivElement);
    expect(props.onLogin).toHaveBeenCalledTimes(1);
  });

  it('should successfully register the user', async () => {
    const AuthRegisterServiceMock = jest.spyOn(AuthRegisterServiceModule, 'AuthRegisterService').mockReturnValue(
      Promise.resolve({
        ok: true,
        data: mockUser,
        headers: {} as Headers,
      })
    );
    const formElem = renderResult.container.querySelector('form') as HTMLFormElement;
    const firstNameInput = renderResult.container.querySelector('input[name="first-name"]') as HTMLInputElement;
    const lastNameInput = renderResult.container.querySelector('input[name="last-name"]') as HTMLInputElement;
    const emailInput = renderResult.container.querySelector('input[name="email"]') as HTMLInputElement;
    const passwordInput = renderResult.container.querySelector('input[name="password"]') as HTMLInputElement;

    fireEvent.change(firstNameInput, { target: { value: 'first name' } });
    fireEvent.change(lastNameInput, { target: { value: 'last name' } });
    fireEvent.change(emailInput, { target: { value: 'email@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    fireEvent.submit(formElem);

    await waitFor(() => expect(renderResult.container.querySelector('.loader1')));

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
    const formElem = renderResult.container.querySelector('form') as HTMLFormElement;
    const firstNameInput = renderResult.container.querySelector('input[name="first-name"]') as HTMLInputElement;
    const lastNameInput = renderResult.container.querySelector('input[name="last-name"]') as HTMLInputElement;
    const emailInput = renderResult.container.querySelector('input[name="email"]') as HTMLInputElement;
    const passwordInput = renderResult.container.querySelector('input[name="password"]') as HTMLInputElement;

    fireEvent.change(firstNameInput, { target: { value: 'first name' } });
    fireEvent.change(lastNameInput, { target: { value: 'last name' } });
    fireEvent.change(emailInput, { target: { value: 'in valid email' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    fireEvent.submit(formElem);

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

    const formElem = renderResult.container.querySelector('form') as HTMLFormElement;
    const firstNameInput = renderResult.container.querySelector('input[name="first-name"]') as HTMLInputElement;
    const lastNameInput = renderResult.container.querySelector('input[name="last-name"]') as HTMLInputElement;
    const emailInput = renderResult.container.querySelector('input[name="email"]') as HTMLInputElement;
    const passwordInput = renderResult.container.querySelector('input[name="password"]') as HTMLInputElement;

    fireEvent.change(firstNameInput, { target: { value: 'first name' } });
    fireEvent.change(lastNameInput, { target: { value: 'last name' } });
    fireEvent.change(emailInput, { target: { value: 'email@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    fireEvent.submit(formElem);

    await waitFor(() => expect(googleRecaptchaMock.reset).toHaveBeenCalledTimes(1));

    expect(props.onClose).not.toHaveBeenCalled();
    expect(props.onSuccess).not.toHaveBeenCalled();

    AuthRegisterServiceMock.mockReset();
  });

  it('should set opted in true from the checkbox', async () => {
    const AuthRegisterServiceMock = jest.spyOn(AuthRegisterServiceModule, 'AuthRegisterService').mockReturnValue(
      Promise.resolve({
        ok: true,
        data: mockUser,
        headers: {} as Headers,
      })
    );
    const formElem = renderResult.container.querySelector('form') as HTMLFormElement;
    const firstNameInput = renderResult.container.querySelector('input[name="first-name"]') as HTMLInputElement;
    const lastNameInput = renderResult.container.querySelector('input[name="last-name"]') as HTMLInputElement;
    const emailInput = renderResult.container.querySelector('input[name="email"]') as HTMLInputElement;
    const passwordInput = renderResult.container.querySelector('input[name="password"]') as HTMLInputElement;
    const optedInCheckbox = renderResult.container.querySelector('#opten-in') as HTMLInputElement;

    fireEvent.change(firstNameInput, { target: { value: 'first name' } });
    fireEvent.change(lastNameInput, { target: { value: 'last name' } });
    fireEvent.change(emailInput, { target: { value: 'email@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    expect(optedInCheckbox.checked).toBeFalsy();
    fireEvent.click(optedInCheckbox);
    expect(optedInCheckbox.checked).toBeTruthy();

    fireEvent.submit(formElem);

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
