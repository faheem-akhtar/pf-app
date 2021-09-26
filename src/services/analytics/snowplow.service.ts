import { StatsContextGlobalInterface } from '@propertyfinder/pf-frontend-common/dist/module/stats/context/global.interface';

import { configCommon } from 'config/common';
import { configPlatform } from 'config/platform';
import { AnalyticsSnowplowEventType } from 'types/analytics/snowplow/event.type';

const getGlobalContext = (locale: string): StatsContextGlobalInterface => ({
  url: location.href,
  application: configPlatform,
  authentication: {
    token: localStorage.getItem('pf-authentication-token-uuid') || '',
    user: null,
    provider: null,
  },
  language: locale,
  currency: configCommon.currencyCode,
  country: configCommon.countryCode,
});

export const AnalyticsSnowplowService = {
  send: (event: AnalyticsSnowplowEventType): void => {
    (window as unknown as { dataLayer: AnalyticsSnowplowEventType[] }).dataLayer.push(event);
  },
};
