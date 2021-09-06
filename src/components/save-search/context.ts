import { createContext } from 'react';
import { SaveSearchContextInterface } from './context.interface';
import { SaveSearchLoadResultInterface } from './load-result-interface';

export const SaveSearchContext = createContext<SaveSearchContextInterface>({
  data: [],
  filtered: [],
  create: () => Promise.resolve({ ok: true, data: {} as SaveSearchLoadResultInterface, headers: {} as Headers }),
});
