import { createContext } from 'react';
import { SnackbarContextInterface } from './context.interface';

export const SnackbarContext = createContext<SnackbarContextInterface>({
  alert: () => null,
  hide: () => null,
});
