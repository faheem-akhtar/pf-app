import { AuthSubscribeEventTypeEnum } from './subscribe-event-type.enum';

export interface AuthSubscriberMetaInterface {
  eventType: AuthSubscribeEventTypeEnum;
  providerType: any | null;
}
