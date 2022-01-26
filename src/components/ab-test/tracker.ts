import { AnalyticsGaService } from 'services/analytics/ga.service';

export const abTestTracker = {
  /**
   * Track all the active ab tests
   */
  load: (abTests: any): void => {
    Object.keys(abTests).forEach((test) =>
      Object.keys(abTests[test].variants).forEach((variant) => {
        if (abTests[test].variants[variant]) {
          AnalyticsGaService.send({
            event: 'customEvent',
            eventCategory: 'Experiments',
            eventAction: `${test}-${variant}`,
          });
        }
      })
    );
  },
};
