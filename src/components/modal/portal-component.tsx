import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { appRootElementId } from 'src/constants/app/root-element-id';

import styles from './modal.module.scss';

export const ModalPortalComponent: React.FunctionComponent<{ overlay?: boolean }> = (props) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    const rootElement = document.getElementById(appRootElementId) as HTMLElement;
    const { scrollTop } = document.documentElement;
    const options: ScrollToOptions = {
      top: scrollTop,
      behavior: 'smooth',
    };

    setIsBrowser(true);
    if (props.overlay) {
      rootElement.classList.add(styles.hide);
    }

    return (): void => {
      if (props.overlay) {
        rootElement.classList.remove(styles.hide);
        document.documentElement.scroll(options);
      }
    };
  }, [props.overlay]);

  if (isBrowser) {
    return ReactDOM.createPortal(props.children, document.getElementById('modal-root') as Element);
  }
  return null;
};
