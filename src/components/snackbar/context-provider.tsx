import { FunctionComponent, useState } from 'react';

import { SnackbarComponent } from 'library/snackbar/component';
import { SnackbarPropsInterface } from 'library/snackbar/props.interface';

import { SnackbarContext } from './context';
import { SnackbarContextInterface } from './context.interface';
import { SnackbarPortalComponent } from './portal-component';

const AUTO_HIDE_DEFAULT_DURATION_WITH_ACTIONS: number = 8;

export const SnackbarContextProvider: FunctionComponent = ({ children }) => {
  const [message, setMessage] = useState<SnackbarPropsInterface>({});

  const value: SnackbarContextInterface = {
    alert: (snackbar) => {
      const autoHideDuration =
        typeof snackbar.autoHideDuration === 'undefined' && snackbar.action
          ? AUTO_HIDE_DEFAULT_DURATION_WITH_ACTIONS
          : snackbar.autoHideDuration;

      setMessage({
        ...snackbar,
        id: Math.random().toString(16).replace('0.', ''),
        visible: true,
        autoHideDuration,
      });
    },

    hide: () => setMessage({ ...message, visible: false }),
  };

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <SnackbarPortalComponent>
        <SnackbarComponent {...message} />
      </SnackbarPortalComponent>
    </SnackbarContext.Provider>
  );
};
