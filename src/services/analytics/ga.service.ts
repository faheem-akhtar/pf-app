import { AnalyticsGaEventType } from 'types/analytics/ga/event.type';

export const AnalyticsGaService = {
  send: (event: AnalyticsGaEventType): void => {
    if (typeof window !== 'undefined') {
      window.dataLayer?.push(event);
    }
  },
};
