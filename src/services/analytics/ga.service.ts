import { AnalyticsGaEventType } from 'types/analytics/ga/event.type';

export const AnalyticsGaService = {
  send: (event: AnalyticsGaEventType): void => {
    window.dataLayer.push(event);
  },
};
