import { createContext } from 'react';
import { SavePropertyContextInterface } from './context.interface';

export const SavePropertyContext = createContext<SavePropertyContextInterface>({
  propertyIds: [],
  toggle: () => null,
});
