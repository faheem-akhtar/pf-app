import React, { useEffect, useState } from 'react';

import AuthService from 'services/auth/service';
import { UserContext } from './context';

export const UserContextProvider = ({ children }: React.PropsWithChildren<{}>): JSX.Element => {
  const [user, setUser] = useState(AuthService.getUser());

  useEffect(() => {
    const unsubscribeAuth = AuthService.subscribe(setUser);

    return (): void => unsubscribeAuth();
  }, []);
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
