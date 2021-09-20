import { createContext } from 'react';

import { SavedPropertyContextInterface } from './context.interface';

export const SavedPropertyContext = createContext<SavedPropertyContextInterface>({
  data: [],
  toggle: () => null,
});
