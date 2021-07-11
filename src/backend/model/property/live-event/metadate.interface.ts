import { BackendModelPropertyLiveEventStatusEnum } from './status.enum';

export interface BackendModelPropertyLiveEventMetadataInterface {
  /**
   * Scheduled start date
   */
  scheduled_start_date: string;

  /**
   * Broadcast id of the live event
   */
  broadcast_id: string;

  /**
   * Status of the live event
   */
  status: BackendModelPropertyLiveEventStatusEnum;

  /**
   * Chat url
   */
  chat_url: string;
}
