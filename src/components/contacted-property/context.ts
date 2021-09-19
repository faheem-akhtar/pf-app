import { createContext } from 'react';

import { ContactedPropertyContextInterface } from './context.interface';

export const ContactedPropertyContext = createContext<ContactedPropertyContextInterface>({
  data: [],
  add: () => null,
});
