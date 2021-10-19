import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { appRootElementId } from 'src/constants/app/root-element-id';

import { appModalRootElementId } from 'constants/app/modal-root-element-id';

import styles from './modal.module.scss';

export const ModalPortalComponent: React.FunctionComponent = (props) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    const rootElement = document.getElementById(appRootElementId) as HTMLElement;
    const { scrollTop } = document.documentElement;

    setIsBrowser(true);
    rootElement.classList.add(styles.hide);

    document.documentElement.querySelectorAll('[data-ad]').forEach((element) => {
      (element as HTMLDivElement).style.display = 'none';
    });

    return (): void => {
      // Prevent body scrolling when nested modals are opened
      if (!document.getElementById(appModalRootElementId)?.children.length) {
        rootElement.classList.remove(styles.hide);
        document.documentElement.scroll({ top: scrollTop });
      }

      document.documentElement.querySelectorAll('[data-ad]').forEach((element) => {
        (element as HTMLDivElement).style.display = '';
      });
    };
  }, []);

  if (isBrowser) {
    return ReactDOM.createPortal(props.children, document.getElementById(appModalRootElementId) as Element);
  }
  return null;
};
