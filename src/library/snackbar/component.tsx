import { FunctionComponent, ReactNode, useEffect, useRef, useState } from 'react';

import { functionNoop } from 'helpers/function/noop';
import { TransitionTypeEnum } from 'library/transition/type.enum';

import { TransitionComponent } from '../transition/component';
import { SnackbarContentComponent } from './content/component';
import { SnackbarContentPropsInterface } from './content/props.interface';
import { SnackbarPropsInterface } from './props.interface';
import styles from './snackbar.module.scss';

const DEFAULT_AUTO_HIDE_DURATION = 5;

export const SnackbarComponent: FunctionComponent<SnackbarPropsInterface> = ({
  id,
  visible,
  message,
  action,
  autoHideDuration = DEFAULT_AUTO_HIDE_DURATION,
  onClose = functionNoop,
  onOpen = functionNoop,
}) => {
  const snackbarContainerElem = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const [queue, setQueue] = useState<Array<Omit<SnackbarContentPropsInterface, 'ref' | 'autoHideClear'>>>([]);

  // Hide the active snackbar
  const hideSnackBar = (): void => {
    setActive(null);
    onClose();
  };

  // Put the new message in the queue and set it active
  useEffect(() => {
    if (id) {
      setQueue(queue.slice(-1).concat({ id, message, action, autoHideDuration }));
      setActive(id);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Hide the snackbar if visibility changes
  useEffect(() => {
    if (!visible && !!active) {
      hideSnackBar();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return (
    <div className={styles.snackbar_container} ref={snackbarContainerElem}>
      {queue.map(
        (item): ReactNode => (
          <TransitionComponent
            key={item.id}
            in={active === item.id && visible}
            type={TransitionTypeEnum.slideUp}
            onEnter={(): void =>
              onOpen({ domReact: snackbarContainerElem?.current?.children?.[0]?.getBoundingClientRect() })
            }
          >
            <SnackbarContentComponent {...item} onClose={(): void => hideSnackBar()} />
          </TransitionComponent>
        )
      )}
    </div>
  );
};
