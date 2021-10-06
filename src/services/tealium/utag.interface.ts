import { TealiumEventInterface } from './event.interface';

export interface TealiumUtagInterface {
  view: (data: TealiumEventInterface) => void;
  link: (data: TealiumEventInterface) => void;
}
