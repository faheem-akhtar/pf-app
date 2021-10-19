import { FunctionComponent, useRef } from 'react';

import { ModalComponent } from 'components/modal/component';
import { functionNoop } from 'helpers/function/noop';

import { PropertyCardMenuModalComponentPropsInterface } from './component-props.interface';
import { PropertyCardMenuModalTemplate } from './template';

export const PropertyCardMenuModalComponent: FunctionComponent<PropertyCardMenuModalComponentPropsInterface> = ({
  openRef,
  closeRef,
  closeButtonLabel,
  onCloseButtonClick = functionNoop,
  children,
}): JSX.Element => {
  const internalCloseRef = useRef<() => void>(functionNoop);
  if (closeRef) {
    closeRef.current = (): void => {
      internalCloseRef.current();
    };
  }

  return (
    <ModalComponent
      openRef={openRef}
      closeRef={internalCloseRef}
      overlay
      onOverlayClick={(): void => {
        internalCloseRef.current();
      }}
    >
      <PropertyCardMenuModalTemplate
        closeButtonLabel={closeButtonLabel}
        onCloseButtonClick={(): void => {
          internalCloseRef.current();
          onCloseButtonClick();
        }}
      >
        {children}
      </PropertyCardMenuModalTemplate>
    </ModalComponent>
  );
};
