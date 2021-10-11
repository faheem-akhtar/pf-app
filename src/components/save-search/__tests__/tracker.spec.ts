import { saveSearchTracker } from '../tracker';

describe('saveSearchTracker', () => {
  beforeEach(() => {
    window.dataLayer = [];
  });

  describe('onClickCta', () => {
    it('should send ga event', () => {
      saveSearchTracker.onClickCta();

      expect(window.dataLayer).toEqual([
        {
          event: 'customEvent',
          eventAction: 'click',
          eventCategory: 'Saved Search',
        },
      ]);
    });
  });

  describe('onOpenCreateDialog', () => {
    it('should send ga event', () => {
      saveSearchTracker.onOpenCreateDialog();

      expect(window.dataLayer).toEqual([
        {
          event: 'customEvent',
          eventAction: 'create:open',
          eventCategory: 'Saved Search',
        },
      ]);
    });
  });

  describe('onCreateSuccess', () => {
    it('should send ga event', () => {
      saveSearchTracker.onCreateSuccess();

      expect(window.dataLayer).toEqual([
        {
          event: 'customEvent',
          eventAction: 'create:success',
          eventCategory: 'Saved Search',
          eventLabel: '',
        },
      ]);
    });

    it('should also send location to ga', () => {
      saveSearchTracker.onCreateSuccess(['1', '2']);

      expect(window.dataLayer).toEqual([
        {
          event: 'customEvent',
          eventAction: 'create:success',
          eventCategory: 'Saved Search',
          eventLabel: '|location:1||location:2|',
        },
      ]);
    });
  });

  describe('onSignInSuccess', () => {
    it('should send ga event', () => {
      saveSearchTracker.onSignInSuccess();

      expect(window.dataLayer).toEqual([
        {
          event: 'customEvent',
          eventAction: 'signIn',
          eventCategory: 'Saved Search',
        },
      ]);
    });
  });

  describe('onSignUpSuccess', () => {
    it('should send ga event', () => {
      saveSearchTracker.onSignUpSuccess();

      expect(window.dataLayer).toEqual([
        {
          event: 'customEvent',
          eventAction: 'signUp',
          eventCategory: 'Saved Search',
        },
      ]);
    });
  });

  describe('onDeleteSuccess', () => {
    it('should send ga event', () => {
      saveSearchTracker.onDeleteSuccess();

      expect(window.dataLayer).toEqual([
        {
          event: 'customEvent',
          eventAction: 'card:delete',
          eventCategory: 'Saved Search',
        },
      ]);
    });
  });

  describe('onDeleteAllSuccess', () => {
    it('should send ga event', () => {
      saveSearchTracker.onDeleteAllSuccess();

      expect(window.dataLayer).toEqual([
        {
          event: 'customEvent',
          eventAction: 'card:deleteAll',
          eventCategory: 'Saved Search',
        },
      ]);
    });
  });

  describe('onOpenEditDialog', () => {
    it('should send ga event', () => {
      saveSearchTracker.onOpenEditDialog();

      expect(window.dataLayer).toEqual([
        {
          event: 'customEvent',
          eventAction: 'card:edit:open',
          eventCategory: 'Saved Search',
        },
      ]);
    });
  });

  describe('onEditSuccess', () => {
    it('should send ga event', () => {
      saveSearchTracker.onEditSuccess();

      expect(window.dataLayer).toEqual([
        {
          event: 'customEvent',
          eventAction: 'card:edit:success',
          eventCategory: 'Saved Search',
        },
      ]);
    });
  });

  describe('onClickCard', () => {
    it('should send ga event', () => {
      saveSearchTracker.onClickCard();

      expect(window.dataLayer).toEqual([
        {
          event: 'customEvent',
          eventAction: 'card:click',
          eventCategory: 'Saved Search',
          eventLabel: '',
        },
      ]);
    });

    it('should also send location to ga', () => {
      saveSearchTracker.onClickCard(['1', '2']);

      expect(window.dataLayer).toEqual([
        {
          event: 'customEvent',
          eventAction: 'card:click',
          eventCategory: 'Saved Search',
          eventLabel: '|location:1||location:2|',
        },
      ]);
    });
  });

  describe('onTooltipOpen', () => {
    it('should send ga event', () => {
      saveSearchTracker.onTooltipOpen();

      expect(window.dataLayer).toEqual([
        {
          event: 'customEvent',
          eventAction: 'Onboarding - Tooltip - Impression',
          eventCategory: 'Onboarding',
          eventLabel: 'Property Serp - Onboarding - Tooltip - Impression - save-search-tooltip',
        },
      ]);
    });
  });

  describe('onTooltipClose', () => {
    it('should send ga event', () => {
      saveSearchTracker.onTooltipClose();

      expect(window.dataLayer).toEqual([
        {
          event: 'customEvent',
          eventAction: 'Onboarding - Tooltip - Close',
          eventCategory: 'Onboarding',
          eventLabel: 'Property Serp - Onboarding - Tooltip - Close - save-search-tooltip - Auto',
        },
      ]);
    });
  });
});
