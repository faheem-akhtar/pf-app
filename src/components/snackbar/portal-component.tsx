import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

export const SnackbarPortalComponent: React.FunctionComponent = ({ children }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (isBrowser) {
    return ReactDOM.createPortal(children, document.getElementById('snackbar-root') as Element);
  }
  return null;
};
