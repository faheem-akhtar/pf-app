import { TealiumDataLayerInterface } from './data-layer.interface';
import { TealiumEventInterface } from './event.interface';

export interface TealiumUtagInterface {
  view: <P extends TealiumDataLayerInterface>(data: P) => void;
  link: <P extends TealiumEventInterface>(data: P) => void;
}
