import { AuthenticationTokenUuid } from '@propertyfinder/pf-frontend-common/dist/module/authentication/token/uuid';
import { BrowserStorageFactory } from '@propertyfinder/pf-frontend-common/dist/module/browser/storage.factory';
import { DataQueueDelayed } from '@propertyfinder/pf-frontend-common/dist/module/data/queue/delayed';
import { EventEmitterFactory } from '@propertyfinder/pf-frontend-common/dist/module/event/emitter.factory';
import { GtmStatsObserver } from '@propertyfinder/pf-frontend-common/dist/module/gtm/stats/observer';
import { GtmStatsTracker } from '@propertyfinder/pf-frontend-common/dist/module/gtm/stats/tracker';
import { SecurityGuardInterface } from '@propertyfinder/pf-frontend-common/dist/module/security/guard.interface';
import { Snowplow2StatsObserver } from '@propertyfinder/pf-frontend-common/dist/module/snowplow2/stats/observer';
import { Snowplow2StatsTracker } from '@propertyfinder/pf-frontend-common/dist/module/snowplow2/stats/tracker';
import { Snowplow2WindowInterface } from '@propertyfinder/pf-frontend-common/dist/module/snowplow2/window.interface';
import { StatsEmitter } from '@propertyfinder/pf-frontend-common/dist/module/stats/emitter';
import { StatsEmitterEntityStrategyFactory } from '@propertyfinder/pf-frontend-common/dist/module/stats/emitter/entity-strategy.factory';
import { StatsDebuggerService } from '@propertyfinder/pf-frontend-common/dist/service/stats-debugger/service';
import { WindowServiceInterface } from '@propertyfinder/pf-frontend-common/dist/service/window/service.interface';

import { configCommon } from 'config/common';
import { configPlatform } from 'config/platform';
import { LocaleService } from 'services/locale/service';

import { StatsContexterService } from './contexter.service';
import { StatsGuardService } from './guard.service';

// Get stats emitter service instance
let statsService: StatsEmitter;

export function StatsService(): StatsEmitter {
  if (!statsService) {
    const dataQueue = new DataQueueDelayed(window as unknown as WindowServiceInterface);
    dataQueue.setDelay(1000);

    statsService = new StatsEmitter(
      EventEmitterFactory(),
      StatsContexterService(),
      StatsEmitterEntityStrategyFactory(),
      StatsDebuggerService()
    );

    StatsGuardService.init();

    const guardService = {
      isAuthorized: () => true,
    } as SecurityGuardInterface;

    new Snowplow2StatsObserver(
      new Snowplow2StatsTracker(<Snowplow2WindowInterface>window, StatsDebuggerService(), guardService)
    ).attachListeners(statsService);

    new GtmStatsObserver(new GtmStatsTracker(window, dataQueue, StatsDebuggerService(), guardService)).attachListeners(
      statsService
    );

    const browserStorage = BrowserStorageFactory();
    browserStorage.setStorage(window.localStorage);

    StatsContexterService().initialize({
      authentication: {
        token: new AuthenticationTokenUuid(browserStorage).getToken(),
      },
      application: configPlatform,
      country: configCommon.countryCode,
      currency: configCommon.currencyCode,
      language: LocaleService.getLocale(),
    });
  }

  return statsService;
}
