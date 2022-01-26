import { TealiumDataLayerInterface } from './data-layer.interface';
import { TealiumEventActionEnum } from './event-action.enum';
import { TealiumEventCategoryEnum } from './event-category.enum';
import { TealiumEventLabelEnum } from './event-label.enum';
import { TealiumEventTypeEnum } from './event-type.enum';

export interface TealiumEventInterface extends TealiumDataLayerInterface {
  event_type: TealiumEventTypeEnum;
  event_category: TealiumEventCategoryEnum | '';
  event_action: TealiumEventActionEnum | '';
  event_label: TealiumEventLabelEnum | Lowercase<any> | '';
}
