/**
 * @jest-environment jsdom
 */
import { fireEvent, render, RenderResult } from '@testing-library/react';

import * as AuthForgotPasswordComponentModule from 'components/auth/forgot-password/component';
import * as AuthLoginComponentModule from 'components/auth/login/component';
import * as AuthRegistrationComponentModule from 'components/auth/registration/component';
import { AuthModalComponent } from '../component';
import { AuthModalPropsInterface } from '../props.interface';

describe('AuthModalComponent', () => {
  let props: AuthModalPropsInterface;
  let renderResult: RenderResult;

  beforeEach(() => {
    props = {
      close: jest.fn(),
      cancel: jest.fn(),
      success: jest.fn(),
    };

    renderResult = render(<AuthModalComponent {...props} />);
  });

  it('renders without throwing any errors', () => {
    expect(renderResult.container).toMatchSnapshot();
  });

  describe('login screen', () => {
    it('should render login by default', () => {
      expect(renderResult.getByTestId('AuthLoginComponent')).toBeTruthy();
    });

    it('should display registration screen', () => {
      fireEvent.click(renderResult.container.querySelector('.link.create-account') as HTMLDivElement);
      expect(renderResult.getByTestId('AuthRegistrationComponent')).toBeTruthy();
    });

    it('should display forgot password screen', () => {
      fireEvent.click(renderResult.container.querySelector('.link.forgot-password') as HTMLDivElement);
      expect(renderResult.getByTestId('AuthForgotPasswordComponent')).toBeTruthy();
    });

    it('should call close', () => {
      jest
        .spyOn(AuthLoginComponentModule, 'AuthLoginComponent')
        .mockImplementationOnce(({ onClose }) => <p onClick={onClose} />);
      renderResult = render(<AuthModalComponent {...props} />);

      fireEvent.click(renderResult.container.querySelector('p') as HTMLParagraphElement);
      expect(props.close).toHaveBeenCalledTimes(1);
    });

    it('should call success', () => {
      jest
        .spyOn(AuthLoginComponentModule, 'AuthLoginComponent')
        .mockImplementationOnce(({ onSuccess }) => <p onClick={onSuccess} />);
      renderResult = render(<AuthModalComponent {...props} />);

      fireEvent.click(renderResult.container.querySelector('p') as HTMLParagraphElement);
      expect(props.success).toHaveBeenCalledTimes(1);
    });
  });

  describe('registration screen', () => {
    beforeEach(() => {
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
      renderResult = render(<AuthModalComponent {...props} />);

      // first switch to registration screen
      fireEvent.click(renderResult.container.querySelector('.link.create-account') as HTMLDivElement);

      fireEvent.click(renderResult.container.querySelector('p') as HTMLParagraphElement);
      expect(props.close).toHaveBeenCalledTimes(1);
    });

    it('should call success', () => {
      jest
        .spyOn(AuthRegistrationComponentModule, 'AuthRegistrationComponent')
        .mockImplementationOnce(({ onSuccess }) => <p onClick={onSuccess} />);
      renderResult = render(<AuthModalComponent {...props} />);

      // first switch to registration screen
      fireEvent.click(renderResult.container.querySelector('.link.create-account') as HTMLDivElement);

      fireEvent.click(renderResult.container.querySelector('p') as HTMLParagraphElement);
      expect(props.success).toHaveBeenCalledTimes(1);
    });
  });

  describe('forgot password screen', () => {
    beforeEach(() => {
      // switch to forgot password screen
      fireEvent.click(renderResult.container.querySelector('.link.forgot-password') as HTMLDivElement);
    });

    it('should switch to registration screen', () => {
      fireEvent.click(renderResult.container.querySelector('.link.create-account') as HTMLDivElement);
      expect(renderResult.getByTestId('AuthRegistrationComponent')).toBeTruthy();
    });

    it('should call close', () => {
      jest
        .spyOn(AuthForgotPasswordComponentModule, 'AuthForgotPasswordComponent')
        .mockImplementationOnce(({ onClose }) => <p onClick={onClose} />);
      renderResult = render(<AuthModalComponent {...props} />);

      // first switch to forgot password screen
      fireEvent.click(renderResult.container.querySelector('.link.forgot-password') as HTMLDivElement);

      fireEvent.click(renderResult.container.querySelector('p') as HTMLParagraphElement);
      expect(props.close).toHaveBeenCalledTimes(1);
    });

    it('should call success', () => {
      jest
        .spyOn(AuthForgotPasswordComponentModule, 'AuthForgotPasswordComponent')
        .mockImplementationOnce(({ onSuccess }) => <p onClick={onSuccess} />);
      renderResult = render(<AuthModalComponent {...props} />);

      // first switch to forgot password screen
      fireEvent.click(renderResult.container.querySelector('.link.forgot-password') as HTMLDivElement);

      fireEvent.click(renderResult.container.querySelector('p') as HTMLParagraphElement);
      expect(props.success).toHaveBeenCalledTimes(1);
    });
  });
});
