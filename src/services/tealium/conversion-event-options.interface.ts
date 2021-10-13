import { TealiumEventEnum } from './event.enum';
import { TealiumEventActionEnum } from './event-action.enum';
import { TealiumEventCategoryEnum } from './event-category.enum';
import { TealiumEventLabelEnum } from './event-label.enum';

export interface TealiumConversionEventOptionsInterface {
  event: TealiumEventEnum;
  eventAction?: TealiumEventActionEnum;
  eventLabel?: TealiumEventLabelEnum;
  eventCategory?: TealiumEventCategoryEnum;

  /**
   * below keys will be passed directly to tealium event
   */
  user_email?: string;

  /**
   * image count in gallery
   */
  gallery_scroll_count?: [string];
}
