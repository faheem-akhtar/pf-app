import { AnalyticsGaService } from 'services/analytics/ga.service';

const sendAnalytics = (data: { eventCategory?: string; eventAction: string; eventLabel?: string }): void => {
  AnalyticsGaService.send({
    event: 'customEvent',
    eventCategory: 'Saved Search',
    ...data,
  });
};

export const saveSearchTracker = {
  /**
   * Trigger on saved search cta clicked
   */
  onClickCta: (): void => {
    sendAnalytics({
      eventAction: 'click',
    });
  },

  /**
   * Trigger when create deialog open
   */
  onOpenCreateDialog: (): void => {
    sendAnalytics({
      eventAction: 'create:open',
    });
  },

  /**
   * Trigger when saved search created
   */
  onCreateSuccess: (locationIds: string[] = []): void => {
    sendAnalytics({
      eventAction: 'create:success',
      eventLabel: locationIds.map((id) => `|location:${id}|`).join(''),
    });
  },

  /**
   * Trigger when user successfully sign in after clicking on the save search cta
   */
  onSignInSuccess: (): void => {
    sendAnalytics({
      eventAction: 'signIn',
    });
  },

  /**
   * Trigger when user successfully register after clicking on the save search cta
   */
  onSignUpSuccess: (): void => {
    sendAnalytics({
      eventAction: 'signUp',
    });
  },

  /**
   * Trigger when user deleted the saved search
   */
  onDeleteSuccess: (): void => {
    sendAnalytics({
      eventAction: 'card:delete',
    });
  },

  /**
   * Trigger when user successfully deleted all the saved searches
   */
  onDeleteAllSuccess: (): void => {
    sendAnalytics({
      eventAction: 'card:deleteAll',
    });
  },

  /**
   * Trigger when user open the dialog for editing
   */
  onOpenEditDialog: (): void => {
    sendAnalytics({
      eventAction: 'card:edit:open',
    });
  },

  /**
   * Trigger when editing is successfull
   */
  onEditSuccess: (): void => {
    sendAnalytics({
      eventAction: 'card:edit:success',
    });
  },

  /**
   * Trigger when user click on the saved search card thats lead him/her to the serp page
   */
  onClickCard: (locationIds: string[] = []): void => {
    sendAnalytics({
      eventAction: 'card:click',
      eventLabel: locationIds.map((id) => `|location:${id}|`).join(''),
    });
  },

  /**
   * Trigger when onboarding tooltip displyed
   */
  onTooltipOpen: (): void => {
    sendAnalytics({
      eventCategory: 'Onboarding',
      eventAction: 'Onboarding - Tooltip - Impression',
      eventLabel: 'Property Serp - Onboarding - Tooltip - Impression - save-search-tooltip',
    });
  },

  /**
   * Trigger when onboarding tooltip closed
   */
  onTooltipClose: (): void => {
    sendAnalytics({
      eventCategory: 'Onboarding',
      eventAction: 'Onboarding - Tooltip - Close',
      eventLabel: 'Property Serp - Onboarding - Tooltip - Close - save-search-tooltip - Auto',
    });
  },
};
