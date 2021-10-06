import { AnalyticsGaEventType } from 'types/analytics/ga/event.type';

import { savedPropertyTracker } from '../tracker';

describe('savedPropertyTracker', () => {
  beforeEach(() => {
    (global as unknown as { dataLayer: AnalyticsGaEventType[] }).dataLayer = [];
  });

  describe('onOpenUserAuthModal', () => {
    it('should send ga event', () => {
      savedPropertyTracker.onOpenUserAuthModal();

      expect((global as unknown as { dataLayer: AnalyticsGaEventType[] }).dataLayer).toEqual([
        {
          event: 'User Interaction',
          eventAction: 'Impression:Login to see saved properties',
        },
      ]);
    });
  });

  describe('onOpenLoginForm', () => {
    it('should send ga event', () => {
      savedPropertyTracker.onOpenLoginForm();

      expect((global as unknown as { dataLayer: AnalyticsGaEventType[] }).dataLayer).toEqual([
        {
          event: 'Userbox',
          eventAction: 'Click:Sign in Button',
          eventLabel: 'Property Serp - Post Call Lead',
        },
      ]);
    });
  });

  describe('onOpenRegisterForm', () => {
    it('should send ga event', () => {
      savedPropertyTracker.onOpenRegisterForm();

      expect((global as unknown as { dataLayer: AnalyticsGaEventType[] }).dataLayer).toEqual([
        {
          event: 'Userbox',
          eventAction: 'Start:Sign up with Email',
          eventLabel: 'Property Serp - Post Call Lead',
        },
      ]);
    });
  });

  describe('onOpenForgotPasswordForm', () => {
    it('should send ga event', () => {
      savedPropertyTracker.onOpenForgotPasswordForm();

      expect((global as unknown as { dataLayer: AnalyticsGaEventType[] }).dataLayer).toEqual([
        {
          event: 'Userbox',
          eventAction: 'Start:Password Reset',
          eventLabel: 'Property Serp - Post Call Lead',
        },
      ]);
    });
  });

  describe('onSuccessLoginWithEmail', () => {
    it('should send ga event', () => {
      savedPropertyTracker.onSuccessLoginWithEmail();

      expect((global as unknown as { dataLayer: AnalyticsGaEventType[] }).dataLayer).toEqual([
        {
          event: 'Userbox',
          eventAction: 'Finish:Sign in with email',
          eventLabel: 'Property Serp - Post Call Lead',
        },
      ]);
    });
  });

  describe('onOpenLoginWithFacebook', () => {
    it('should send ga event', () => {
      savedPropertyTracker.onOpenLoginWithFacebook();

      expect((global as unknown as { dataLayer: AnalyticsGaEventType[] }).dataLayer).toEqual([
        {
          event: 'Userbox',
          eventAction: 'Start:Sign in with facebook',
          eventLabel: 'Property Serp - Post Call Lead',
        },
      ]);
    });
  });

  describe('onOpenLoginWithGoogle', () => {
    it('should send ga event', () => {
      savedPropertyTracker.onOpenLoginWithGoogle();

      expect((global as unknown as { dataLayer: AnalyticsGaEventType[] }).dataLayer).toEqual([
        {
          event: 'Userbox',
          eventAction: 'Start:Sign in with google',
          eventLabel: 'Property Serp - Post Call Lead',
        },
      ]);
    });
  });

  describe('onSuccessLoginWithFacebook', () => {
    it('should send ga event', () => {
      savedPropertyTracker.onSuccessLoginWithFacebook();

      expect((global as unknown as { dataLayer: AnalyticsGaEventType[] }).dataLayer).toEqual([
        {
          event: 'Userbox',
          eventAction: 'Finish:Sign in with facebook',
          eventLabel: 'Property Serp - Post Call Lead',
        },
      ]);
    });
  });

  describe('onSuccessLoginWithGoogle', () => {
    it('should send ga event', () => {
      savedPropertyTracker.onSuccessLoginWithGoogle();

      expect((global as unknown as { dataLayer: AnalyticsGaEventType[] }).dataLayer).toEqual([
        {
          event: 'Userbox',
          eventAction: 'Finish:Sign in with google',
          eventLabel: 'Property Serp - Post Call Lead',
        },
      ]);
    });
  });
});
