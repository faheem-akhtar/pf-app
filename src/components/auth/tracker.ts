import { AnalyticsGaService } from 'services/analytics/ga.service';

const sendAnalytics = (data: { eventAction: string; eventLabel: string }): void => {
  AnalyticsGaService.send({
    event: 'Userbox',
    ...data,
  });
};

export const authTracker = {
  /**
   * Trigger when login form open
   */
  onOpenLoginForm: (eventLabel: string): void => {
    sendAnalytics({
      eventAction: 'Click:Sign in Button',
      eventLabel,
    });
  },

  /**
   * Trigger when user successfully logged in with email
   */
  onSuccessLoginWithEmail: (eventLabel: string): void => {
    sendAnalytics({
      eventAction: 'Finish:Sign in with email',
      eventLabel,
    });
  },

  /**
   * Trigger when register form open
   */
  onOpenRegisterForm: (eventLabel: string): void => {
    sendAnalytics({
      eventAction: 'Start:Sign up with Email',
      eventLabel,
    });
  },

  /**
   * Trigger when forgot password form open
   */
  onOpenForgotPasswordForm: (eventLabel: string): void => {
    sendAnalytics({
      eventAction: 'Start:Password Reset',
      eventLabel,
    });
  },

  /**
   * Trigger when user start login process with facebook
   */
  onOpenLoginWithFacebook: (eventLabel: string): void => {
    sendAnalytics({
      eventAction: 'Start:Sign in with facebook',
      eventLabel,
    });
  },

  /**
   * Trigger when user start login process with google
   */
  onOpenLoginWithGoogle: (eventLabel: string): void => {
    sendAnalytics({
      eventAction: 'Start:Sign in with google',
      eventLabel,
    });
  },

  /**
   * Trigger when user successfully logged in with facebook
   */
  onSuccessLoginWithFacebook: (eventLabel: string): void => {
    sendAnalytics({
      eventAction: 'Finish:Sign in with facebook',
      eventLabel,
    });
  },

  /**
   * Trigger when user successfully logged in with google
   */
  onSuccessLoginWithGoogle: (eventLabel: string): void => {
    sendAnalytics({
      eventAction: 'Finish:Sign in with google',
      eventLabel,
    });
  },
};
