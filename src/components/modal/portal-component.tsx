import { ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

export const ModalPortalComponent = ({ children }: { children: ReactNode }): JSX.Element | null => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (isBrowser) {
    return ReactDOM.createPortal(children, document.getElementById('modal-root') as Element);
  }
  return null;
};
