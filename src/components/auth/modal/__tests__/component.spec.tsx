/**
 * @jest-environment jsdom
 */
import { act, fireEvent, render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as AuthForgotPasswordComponentModule from 'components/auth/forgot-password/component';
import * as AuthLoginComponentModule from 'components/auth/login/component';
import * as AuthRegistrationComponentModule from 'components/auth/registration/component';
import { AuthSuccessTypeEnum } from 'components/auth/success-type.enum';
import { AnalyticsGaEventType } from 'types/analytics/ga/event.type';

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

    (global as unknown as { dataLayer: AnalyticsGaEventType[] }).dataLayer = [];
  });

  it('renders without throwing any errors', () => {
    expect(renderResult.container).toMatchSnapshot();
  });

  describe('login screen', () => {
    it('should render login by default', () => {
      expect(screen.getByRole('heading', { level: 1, name: 'sign-in' })).toBeInTheDocument();
    });

    it('should display registration screen', () => {
      act(() => {
        userEvent.click(screen.getByText('auth/not-registered-yet', { exact: false }));
      });
      expect(screen.getByRole('heading', { level: 1, name: 'auth/create-account' })).toBeInTheDocument();

      expect((global as unknown as { dataLayer: AnalyticsGaEventType[] }).dataLayer).toEqual([
        {
          event: 'Userbox',
          eventAction: 'Start:Sign up with Email',
          eventLabel: 'Header',
        },
      ]);
    });

    it('should display forgot password screen', () => {
      act(() => {
        userEvent.click(screen.getByText('auth/forgot-password?'));
      });
      expect(screen.getByRole('heading', { level: 1, name: 'auth/forgot-password?' })).toBeInTheDocument();

      expect((global as unknown as { dataLayer: AnalyticsGaEventType[] }).dataLayer).toEqual([
        {
          event: 'Userbox',
          eventAction: 'Start:Password Reset',
          eventLabel: 'Header',
        },
      ]);
    });

    it('should call close', () => {
      jest
        .spyOn(AuthLoginComponentModule, 'AuthLoginComponent')
        .mockImplementationOnce(({ onClose }) => <button data-testid='close-button' onClick={onClose} />);
      renderResult = render(<AuthModalComponent {...props} />);

      userEvent.click(renderResult.getByTestId('close-button'));
      expect(props.close).toHaveBeenCalledTimes(1);
    });

    it('should call success', () => {
      jest
        .spyOn(AuthLoginComponentModule, 'AuthLoginComponent')
        .mockImplementationOnce(({ onSuccess }) => (
          <button data-testid='my-button' onClick={(): void => onSuccess(AuthSuccessTypeEnum.signInWithEmail)} />
        ));
      renderResult = render(<AuthModalComponent {...props} />);

      (global as unknown as { dataLayer: AnalyticsGaEventType[] }).dataLayer = [];

      act(() => {
        userEvent.click(renderResult.getByTestId('my-button'));
      });

      expect(props.success).toHaveBeenCalledTimes(1);

      expect((global as unknown as { dataLayer: AnalyticsGaEventType[] }).dataLayer).toEqual([
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
      renderResult = render(<AuthModalComponent {...props} />);

      (global as unknown as { dataLayer: AnalyticsGaEventType[] }).dataLayer = [];

      act(() => {
        userEvent.click(renderResult.getByTestId('my-button'));
      });

      expect((global as unknown as { dataLayer: AnalyticsGaEventType[] }).dataLayer).toEqual([
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
      renderResult = render(<AuthModalComponent {...props} />);

      (global as unknown as { dataLayer: AnalyticsGaEventType[] }).dataLayer = [];

      act(() => {
        userEvent.click(renderResult.getByTestId('my-button'));
      });

      expect((global as unknown as { dataLayer: AnalyticsGaEventType[] }).dataLayer).toEqual([
        {
          event: 'Userbox',
          eventAction: 'Finish:Sign in with google',
          eventLabel: 'Header',
        },
      ]);
    });
  });

  describe('registration screen', () => {
    beforeEach(() => {
      // switch to registration screen
      userEvent.click(screen.getByText('auth/not-registered-yet? auth/create-account'));
    });

    it('should switch to login screen', () => {
      userEvent.click(screen.getByText('auth/already-registered? log-in'));

      expect(screen.getByRole('heading', { level: 1, name: 'sign-in' })).toBeInTheDocument();
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
        .mockImplementationOnce(({ onSuccess }) => (
          <p onClick={(): void => onSuccess(AuthSuccessTypeEnum.registerWithEmail)} />
        ));
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
      userEvent.click(screen.getByText('auth/forgot-password?'));
    });

    it('should switch to registration screen', () => {
      userEvent.click(screen.getByText('auth/not-registered-yet? auth/create-account'));

      expect(screen.getByRole('heading', { level: 1, name: 'auth/create-account' })).toBeInTheDocument();
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
