import { AuthenticationProviderType } from '@propertyfinder/pf-frontend-common/dist/module/stats/types';

import { AuthSubscribeEventTypeEnum } from './subscribe-event-type.enum';

export interface AuthSubscriberMetaInterface {
  eventType: AuthSubscribeEventTypeEnum;
  providerType: AuthenticationProviderType | null;
}
