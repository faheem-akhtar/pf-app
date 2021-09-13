import React from 'react';

import { UserModelInterface } from 'services/user/model.interface';

import { userDefaultState } from './default-state';

export const UserContext = React.createContext<UserModelInterface | null>(userDefaultState);
