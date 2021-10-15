import { BrowserStorageFactory } from '@propertyfinder/pf-frontend-common/dist/module/browser/storage.factory';
import { StatsAttribution } from '@propertyfinder/pf-frontend-common/dist/module/stats/attribution';

import { helpersIsClient } from 'helpers/is-client';

let statsAttributionService: StatsAttribution;

export function StatsAttributionService(): StatsAttribution {
  if (!statsAttributionService && helpersIsClient) {
    const browserStorageLocalService = BrowserStorageFactory();

    browserStorageLocalService.setStorage(window.localStorage);
    statsAttributionService = new StatsAttribution(browserStorageLocalService);
  }

  return statsAttributionService;
}
