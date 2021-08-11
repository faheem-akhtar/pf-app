import { ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { appRootElementId } from 'src/constants/app/root-element-id';

import styles from './modal.module.scss';

export const ModalPortalComponent = ({ children }: { children: ReactNode }): JSX.Element | null => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    const rootElement = document.getElementById(appRootElementId) as HTMLElement;
    const { scrollTop } = document.documentElement;

    setIsBrowser(true);
    rootElement.classList.add(styles.hide);

    return (): void => {
      rootElement.classList.remove(styles.hide);
      document.documentElement.scrollTop = scrollTop;
    };
  }, []);

  if (isBrowser) {
    return ReactDOM.createPortal(children, document.getElementById('modal-root') as Element);
  }
  return null;
};
