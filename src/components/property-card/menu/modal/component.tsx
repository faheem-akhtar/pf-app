import { useRef } from 'react';

import { functionNoop } from 'helpers/function/noop';

import { PropertyCardMenuModalComponentPropsInterface } from './component-props.interface';
import { PropertyCardMenuModalTemplate } from './template';

import { ModalComponent } from 'components/modal/component';

// TODO-FE[CX-440] add tests
export const PropertyCardMenuModalComponent = ({
  children,
  openRef,
  closeRef,
  closeButtonLabel,
  onCloseButtonClick = functionNoop,
  onOverlayClick = functionNoop,
}: PropertyCardMenuModalComponentPropsInterface): JSX.Element => {
  const internalCloseRef = useRef<() => void>(functionNoop);
  if (closeRef) {
    closeRef.current = (): void => {
      internalCloseRef.current();
    };
  }

  return (
    <ModalComponent openRef={openRef} closeRef={internalCloseRef} overlay>
      <PropertyCardMenuModalTemplate
        closeButtonLabel={closeButtonLabel}
        onCloseButtonClick={(): void => {
          internalCloseRef.current();
          onCloseButtonClick();
        }}
        onOverlayClick={(): void => {
          internalCloseRef.current();
          onOverlayClick();
        }}
      >
        {children}
      </PropertyCardMenuModalTemplate>
    </ModalComponent>
  );
};
