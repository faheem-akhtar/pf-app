import { UserModelInterface } from 'services/user/model.interface';

export type AuthSubscriberType = (userModel: UserModelInterface | null) => void;
