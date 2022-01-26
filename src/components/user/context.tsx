import React from 'react';

import { UserInterface } from './interface';

export const UserContext = React.createContext<UserInterface | null>(null);
