import { authTracker } from '../tracker';

describe('authTracker', () => {
  beforeEach(() => {
    window.dataLayer = [];
  });

  describe('onOpenLoginForm', () => {
    it('should send ga event', () => {
      authTracker.onOpenLoginForm('event label');

      expect(window.dataLayer).toEqual([
        {
          event: 'Userbox',
          eventAction: 'Click:Sign in Button',
          eventLabel: 'event label',
        },
      ]);
    });
  });

  describe('onOpenRegisterForm', () => {
    it('should send ga event', () => {
      authTracker.onOpenRegisterForm('event label');

      expect(window.dataLayer).toEqual([
        {
          event: 'Userbox',
          eventAction: 'Start:Sign up with Email',
          eventLabel: 'event label',
        },
      ]);
    });
  });

  describe('onOpenForgotPasswordForm', () => {
    it('should send ga event', () => {
      authTracker.onOpenForgotPasswordForm('event label');

      expect(window.dataLayer).toEqual([
        {
          event: 'Userbox',
          eventAction: 'Start:Password Reset',
          eventLabel: 'event label',
        },
      ]);
    });
  });

  describe('onSuccessLoginWithEmail', () => {
    it('should send ga event', () => {
      authTracker.onSuccessLoginWithEmail('event label');

      expect(window.dataLayer).toEqual([
        {
          event: 'Userbox',
          eventAction: 'Finish:Sign in with email',
          eventLabel: 'event label',
        },
      ]);
    });
  });

  describe('onOpenLoginWithFacebook', () => {
    it('should send ga event', () => {
      authTracker.onOpenLoginWithFacebook('event label');

      expect(window.dataLayer).toEqual([
        {
          event: 'Userbox',
          eventAction: 'Start:Sign in with facebook',
          eventLabel: 'event label',
        },
      ]);
    });
  });

  describe('onOpenLoginWithGoogle', () => {
    it('should send ga event', () => {
      authTracker.onOpenLoginWithGoogle('event label');

      expect(window.dataLayer).toEqual([
        {
          event: 'Userbox',
          eventAction: 'Start:Sign in with google',
          eventLabel: 'event label',
        },
      ]);
    });
  });

  describe('onSuccessLoginWithFacebook', () => {
    it('should send ga event', () => {
      authTracker.onSuccessLoginWithFacebook('event label');

      expect(window.dataLayer).toEqual([
        {
          event: 'Userbox',
          eventAction: 'Finish:Sign in with facebook',
          eventLabel: 'event label',
        },
      ]);
    });
  });

  describe('onSuccessLoginWithGoogle', () => {
    it('should send ga event', () => {
      authTracker.onSuccessLoginWithGoogle('event label');

      expect(window.dataLayer).toEqual([
        {
          event: 'Userbox',
          eventAction: 'Finish:Sign in with google',
          eventLabel: 'event label',
        },
      ]);
    });
  });
});
