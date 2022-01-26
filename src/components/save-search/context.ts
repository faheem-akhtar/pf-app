import { createContext } from 'react';

import { SaveSearchContextInterface } from './context.interface';
import { SaveSearchInterface } from './interface';

export const SaveSearchContext = createContext<SaveSearchContextInterface>({
  ok: null,
  data: [],
  filtered: [],
  create: () => Promise.resolve({ ok: true, data: {} as SaveSearchInterface, headers: {} as Headers }),
});
