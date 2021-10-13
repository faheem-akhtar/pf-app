import { TealiumAgentStatsInterface } from './agent-stats.interface';
import { TealiumConversionEventOptionsInterface } from './conversion-event-options.interface';
import { TealiumDataLayerInterface } from './data-layer.interface';
import { TealiumEventEnum } from './event.enum';
import { TealiumUtagInterface } from './utag.interface';

export interface TealiumServiceInterface extends TealiumUtagInterface {
  onAppDownloadClicked: () => void;
  onPageViewRendered: <T extends TealiumDataLayerInterface>(payload: T) => void;
  onConversionEventCalled: (
    event: TealiumEventEnum,
    payload: TealiumAgentStatsInterface,
    options?: Omit<TealiumConversionEventOptionsInterface, 'event'>
  ) => void;
}
