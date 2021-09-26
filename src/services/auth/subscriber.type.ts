import { UserModelInterface } from 'services/user/model.interface';

import { AuthSubscriberMetaInterface } from './subscriber-meta.interface';

export type AuthSubscriberType = (userModel: UserModelInterface | null, meta?: AuthSubscriberMetaInterface) => void;
