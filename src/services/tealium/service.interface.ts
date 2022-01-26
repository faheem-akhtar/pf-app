import { TealiumAgentStatsInterface } from './agent-stats.interface';
import { TealiumConversionEventOptionsInterface } from './conversion-event-options.interface';
import { TealiumDataLayerInterface } from './data-layer.interface';
import { TealiumEventEnum } from './event.enum';
import { TealiumUserInterface } from './user.interface';
import { TealiumUtagInterface } from './utag.interface';

export interface TealiumServiceInterface extends TealiumUtagInterface {
  onAppDownloadClicked: () => void;
  onPageViewRendered: <T extends TealiumDataLayerInterface>(payload: T) => void;
  callStalledEvents: () => void;
  onConversionEventCalled: (
    event: TealiumEventEnum,
    payload: TealiumAgentStatsInterface,
    options?: Omit<TealiumConversionEventOptionsInterface, 'event'>
  ) => void;
  onUserRegistered: (user: TealiumUserInterface) => void;
  onUserLoggedIn: (user: TealiumUserInterface, provider: Lowercase<any>) => void;
  onUserLoggedOut: (user: TealiumUserInterface) => void;
}
