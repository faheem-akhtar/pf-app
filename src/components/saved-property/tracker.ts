import { authTracker } from 'components/auth/tracker';
import { AnalyticsGaService } from 'services/analytics/ga.service';

export const savedPropertyTracker = {
  /**
   * Trigger when user login modal open
   */
  onOpenUserAuthModal: (): void => {
    AnalyticsGaService.send({
      event: 'User Interaction',
      eventAction: 'Impression:Login to see saved properties',
    });
  },

  /**
   * Trigger when login form open
   */
  onOpenLoginForm: (): void => {
    authTracker.onOpenLoginForm('Property Serp - Post Call Lead');
  },

  /**
   * Trigger when user successfully logged in with email
   */
  onSuccessLoginWithEmail: (): void => {
    authTracker.onSuccessLoginWithEmail('Property Serp - Post Call Lead');
  },

  /**
   * Trigger when register form open
   */
  onOpenRegisterForm: (): void => {
    authTracker.onOpenRegisterForm('Property Serp - Post Call Lead');
  },

  /**
   * Trigger when forgot password form open
   */
  onOpenForgotPasswordForm: (): void => {
    authTracker.onOpenForgotPasswordForm('Property Serp - Post Call Lead');
  },

  /**
   * Trigger when user start login process with facebook
   */
  onOpenLoginWithFacebook: (): void => {
    authTracker.onOpenLoginWithFacebook('Property Serp - Post Call Lead');
  },

  /**
   * Trigger when user start login process with google
   */
  onOpenLoginWithGoogle: (): void => {
    authTracker.onOpenLoginWithGoogle('Property Serp - Post Call Lead');
  },

  /**
   * Trigger when user successfully logged in with facebook
   */
  onSuccessLoginWithFacebook: (): void => {
    authTracker.onSuccessLoginWithFacebook('Property Serp - Post Call Lead');
  },

  /**
   * Trigger when user successfully logged in with google
   */
  onSuccessLoginWithGoogle: (): void => {
    authTracker.onSuccessLoginWithGoogle('Property Serp - Post Call Lead');
  },
};
