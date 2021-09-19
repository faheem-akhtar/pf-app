import { BrowserWindow } from '@propertyfinder/pf-frontend-common/dist/module/browser/window';
import { EventEmitterFactory } from '@propertyfinder/pf-frontend-common/dist/module/event/emitter.factory';
import { StatsContexter } from '@propertyfinder/pf-frontend-common/dist/module/stats/contexter';

let service: StatsContexter;

export const StatsContexterService = (): StatsContexter => {
  if (!service) {
    service = new StatsContexter(new BrowserWindow(EventEmitterFactory(), window));
  }

  return service;
};
