import { UserInterface } from 'components/user/interface';

import { AuthSubscriberMetaInterface } from './subscriber-meta.interface';

export type AuthSubscriberType = (userModel: UserInterface | null, meta: AuthSubscriberMetaInterface) => void;
