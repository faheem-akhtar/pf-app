import { FunctionComponent, useEffect, useRef } from 'react';

import { domClassMerge } from 'helpers/dom/class-merge';
import { domToChildArray } from 'helpers/dom/to-child-array';
import { functionNoop } from 'helpers/function/noop';

import styles from '../snackbar.module.scss';
import { SNACKBAR_CONTENT_MAX_NUMBER_OF_ACTIONS } from './max-number-of-actions.constant';
import { SNACKBAR_CONTENT_MAX_NUMBER_OF_ACTIONS_INLINE } from './max-number-of-actions-inline.constant';
import { SnackbarContentPropsInterface } from './props.interface';

export const SnackbarContentComponent: FunctionComponent<SnackbarContentPropsInterface> = ({
  message,
  action,
  className,
  autoHideDuration,
  onClose = functionNoop,
}) => {
  const snackbarElem = useRef<HTMLDivElement>(null);

  // Limit the number and type of actions
  const actions = domToChildArray<HTMLButtonElement>(action, (item) =>
    ['button', 'a'].includes(item.type as string)
  ).slice(0, SNACKBAR_CONTENT_MAX_NUMBER_OF_ACTIONS);

  // is event target is on the snackbar
  const isComponentTargeted = (event: MouseEvent): boolean | null => {
    return snackbarElem?.current && snackbarElem.current.contains(event.target as Node);
  };

  // Trigger auto hide base on the duration
  useEffect(() => {
    if (autoHideDuration && autoHideDuration > 0) {
      const interval = setTimeout(onClose, autoHideDuration * 1000);
      return (): void => clearTimeout(interval);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // close the snackbar if clicked outside
  useEffect(() => {
    const onClickDocument = (event: MouseEvent): void => {
      if (!isComponentTargeted(event)) {
        onClose();
      }
    };
    window.document.addEventListener('click', onClickDocument);
    return (): void => window.document.removeEventListener('click', onClickDocument);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={snackbarElem}
      data-key='snackbar'
      className={domClassMerge(
        styles.snackbar,
        {
          [styles['snackbar--wrap']]: actions.length > SNACKBAR_CONTENT_MAX_NUMBER_OF_ACTIONS_INLINE,
        },
        className
      )}
    >
      <p className={styles.snackbar_message} data-key='snackbar-message'>
        {message}
      </p>
      {!!actions.length && (
        <div className={styles.snackbar_actions} data-key='snackbar-actions'>
          {actions}
        </div>
      )}
    </div>
  );
};
