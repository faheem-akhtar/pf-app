import React from 'react';

import { UserModelInterface } from 'services/user/model.interface';

export const UserContext = React.createContext<UserModelInterface | null>(null);
