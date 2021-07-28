import { useConstructorHook } from 'helpers/hook/constructor.hook';
import { useState } from 'react';

import { ModalComponentPropsInterface } from './component.props.interface';
import { ModalPortalComponent } from './portal-component';

import styles from './modal.module.scss';

export const ModalComponent = ({ openRef, closeRef, children }: ModalComponentPropsInterface): JSX.Element | null => {
  const [opened, setOpened] = useState(false);

  useConstructorHook(() => {
    openRef.current = (): void => setOpened(true);
    closeRef.current = (): void => setOpened(false);
  });

  if (!opened) return null;

  return (
    <ModalPortalComponent>
      <div className={styles.container}>{children}</div>
    </ModalPortalComponent>
  );
};
