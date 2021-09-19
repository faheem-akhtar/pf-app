import { AuthenticationTokenUuid } from '@propertyfinder/pf-frontend-common/dist/module/authentication/token/uuid';
import { BrowserStorageFactory } from '@propertyfinder/pf-frontend-common/dist/module/browser/storage.factory';
import { EventEmitterFactory } from '@propertyfinder/pf-frontend-common/dist/module/event/emitter.factory';
import { SecurityGuardInterface } from '@propertyfinder/pf-frontend-common/dist/module/security/guard.interface';
import { Snowplow2StatsObserver } from '@propertyfinder/pf-frontend-common/dist/module/snowplow2/stats/observer';
import { Snowplow2StatsTracker } from '@propertyfinder/pf-frontend-common/dist/module/snowplow2/stats/tracker';
import { Snowplow2WindowInterface } from '@propertyfinder/pf-frontend-common/dist/module/snowplow2/window.interface';
import { StatsEmitter } from '@propertyfinder/pf-frontend-common/dist/module/stats/emitter';
import { StatsEmitterEntityStrategyFactory } from '@propertyfinder/pf-frontend-common/dist/module/stats/emitter/entity-strategy.factory';
import { StatsDebuggerService } from '@propertyfinder/pf-frontend-common/dist/service/stats-debugger/service';

import { configCommon } from 'config/common';
import { configPlatform } from 'config/platform';
import { LocaleService } from 'services/locale/service';

import { StatsContexterService } from './contexter.service';

// Get stats emitter service instance
let statsService: StatsEmitter;

export function StatsService(): StatsEmitter {
  if (!statsService) {
    statsService = new StatsEmitter(
      EventEmitterFactory(),
      StatsContexterService(),
      StatsEmitterEntityStrategyFactory(),
      StatsDebuggerService()
    );

    StatsDebuggerService().activate(true);

    new Snowplow2StatsObserver(
      new Snowplow2StatsTracker(<Snowplow2WindowInterface>window, StatsDebuggerService(), {
        isAuthorized: () => true,
      } as SecurityGuardInterface)
    ).attachListeners(statsService);
    //GtmStatsObserverFactory().attachListeners(statsService);

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
