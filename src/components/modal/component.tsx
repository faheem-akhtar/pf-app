import { useRef, useState } from 'react';

import { domClassMerge } from 'helpers/dom/class-merge';
import { functionNoop } from 'helpers/function/noop';
import { useReactConstructor } from 'helpers/react/constructor.hook';

import { ModalComponentPropsInterface } from './component-props.interface';
import { ModalPortalComponent } from './portal-component';

import styles from './modal.module.scss';

export const ModalComponent = ({
  openRef,
  closeRef,
  children,
  containerClassName,
  onOpen = functionNoop,
  onOverlayClick = functionNoop,
  overlay = false,
}: ModalComponentPropsInterface): JSX.Element | null => {
  const [opened, setOpened] = useState(false);
  const onOpenRef = useRef(onOpen);
  onOpenRef.current = onOpen;

  useReactConstructor(() => {
    openRef.current = (): void => {
      setOpened(true);
      onOpenRef.current();
    };
    closeRef.current = (): void => setOpened(false);
  });

  if (!opened) return null;
  return (
    <ModalPortalComponent overlay={overlay}>
      <div
        className={domClassMerge(styles.container, containerClassName, {
          [styles[`container--overlay`]]: overlay,
        })}
        onClick={overlay ? onOverlayClick : functionNoop}
      >
        {children}
      </div>
    </ModalPortalComponent>
  );
};
