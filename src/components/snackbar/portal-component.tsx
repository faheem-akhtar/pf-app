import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { APP_SNACKBAR_ROOT_ELEMENT_ID } from 'constants/app/snackbar-root-element-id.constant';

export const SnackbarPortalComponent: React.FunctionComponent = ({ children }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (isBrowser) {
    return ReactDOM.createPortal(children, document.getElementById(APP_SNACKBAR_ROOT_ELEMENT_ID) as Element);
  }
  return null;
};
