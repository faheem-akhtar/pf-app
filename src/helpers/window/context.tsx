import React from 'react';

import { WindowContextInterface } from './context.interface';
import { windowDefaultState } from './default-state';

export const WindowContext = React.createContext<WindowContextInterface>(windowDefaultState);
