import React from 'react';

import { userDefaultState } from './default-state';
import { UserModelInterface } from 'services/user/model.interface';

export const UserContext = React.createContext<UserModelInterface | null>(userDefaultState);
