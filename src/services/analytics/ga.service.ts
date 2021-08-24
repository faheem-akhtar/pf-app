import { AnalyticsGaEventType } from 'types/analytics/ga/event.type';

export const AnalyticsGaService = {
  send: (event: AnalyticsGaEventType): void => {
    (window as unknown as { dataLayer: AnalyticsGaEventType[] }).dataLayer.push(event);
  },
};
