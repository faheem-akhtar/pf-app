import { AnalyticsSnowplowEventType } from 'types/analytics/snowplow/event.type';

export const AnalyticsSnowplowService = {
  send: (event: AnalyticsSnowplowEventType): void => {
    window.dataLayer.push(event);
  },
};
