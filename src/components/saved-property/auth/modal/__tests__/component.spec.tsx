/**
 * @jest-environment jsdom
 */
import { fireEvent, render, RenderResult } from '@testing-library/react';

import * as AuthForgotPasswordComponentModule from 'components/auth/forgot-password/component';
import * as AuthLoginComponentModule from 'components/auth/login/component';
import * as AuthRegistrationComponentModule from 'components/auth/registration/component';

import { SavedPropertyAuthModalComponent } from '../component';
import { SavedPropertyAuthModalPropsInterface } from '../props.interface';

describe('SavedPropertyAuthModalComponent', () => {
  let props: SavedPropertyAuthModalPropsInterface;
  let renderResult: RenderResult;

  beforeEach(() => {
    props = {
      onClose: jest.fn(),
    };

    renderResult = render(<SavedPropertyAuthModalComponent {...props} />);
  });

  it('renders without throwing any errors', () => {
    expect(renderResult.container).toMatchSnapshot();
  });

  describe('login screen', () => {
    it('should render short login template by default', () => {
      expect(renderResult.getByTestId('saved-property-auth-login-template')).toBeTruthy();
    });

    it('should display login screen', () => {
      fireEvent.click(renderResult.getByText('log-in') as HTMLButtonElement);
      expect(renderResult.getByTestId('AuthLoginComponent')).toBeTruthy();
    });

    it('should call close', () => {
      jest
        .spyOn(AuthLoginComponentModule, 'AuthLoginComponent')
        .mockImplementationOnce(({ onClose }) => <p onClick={onClose} />);
      renderResult = render(<SavedPropertyAuthModalComponent {...props} />);

      fireEvent.click(renderResult.container.querySelector('p') as HTMLParagraphElement);
      expect(props.onClose).toHaveBeenCalledTimes(1);
    });

    it('should call close on header', () => {
      fireEvent.click(renderResult.getByTestId('auth-close-icon') as HTMLDivElement);
      expect(props.onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('registration screen', () => {
    beforeEach(() => {
      // switch to login screen
      fireEvent.click(renderResult.getByText('log-in') as HTMLButtonElement);
      // switch to registration screen
      fireEvent.click(renderResult.container.querySelector('.link.create-account') as HTMLDivElement);
    });

    it('should switch to login screen', () => {
      fireEvent.click(renderResult.container.querySelector('.link.create-account') as HTMLDivElement);
      expect(renderResult.getByTestId('AuthLoginComponent')).toBeTruthy();
    });

    it('should call close', () => {
      jest
        .spyOn(AuthRegistrationComponentModule, 'AuthRegistrationComponent')
        .mockImplementationOnce(({ onClose }) => <p onClick={onClose} />);
      renderResult = render(<SavedPropertyAuthModalComponent {...props} />);

      // switch to login screen
      fireEvent.click(renderResult.getByText('log-in') as HTMLButtonElement);
      // first switch to registration screen
      fireEvent.click(renderResult.container.querySelector('.link.create-account') as HTMLDivElement);

      fireEvent.click(renderResult.container.querySelector('p') as HTMLParagraphElement);
      expect(props.onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('forgot password screen', () => {
    beforeEach(() => {
      // switch to login screen
      fireEvent.click(renderResult.getByText('log-in') as HTMLButtonElement);
      // switch to forgot password screen
      fireEvent.click(renderResult.container.querySelector('.link.forgot-password') as HTMLDivElement);
    });

    it('should switch to registration screen', () => {
      fireEvent.click(renderResult.getByText('auth/not-registered-yet? auth/create-account') as HTMLDivElement);
      expect(renderResult.getByRole('heading', { level: 1, name: 'auth/create-account' })).toBeInTheDocument();
    });

    it('should call close', () => {
      jest
        .spyOn(AuthForgotPasswordComponentModule, 'AuthForgotPasswordComponent')
        .mockImplementationOnce(({ onClose }) => <p onClick={onClose} />);
      renderResult = render(<SavedPropertyAuthModalComponent {...props} />);

      // switch to login screen
      fireEvent.click(renderResult.getByText('log-in') as HTMLButtonElement);
      // first switch to forgot password screen
      fireEvent.click(renderResult.container.querySelector('.link.forgot-password') as HTMLDivElement);

      fireEvent.click(renderResult.container.querySelector('p') as HTMLParagraphElement);
      expect(props.onClose).toHaveBeenCalledTimes(1);
    });
  });
});