import { useRef } from 'react';

import { functionNoop } from 'helpers/function/noop';

import { PropertyCardMenuModalComponentPropsInterface } from './component-props.interface';
import { PropertyCardMenuModalTemplate } from './template';

import { ModalComponent } from 'components/modal/component';

export const PropertyCardMenuModalComponent = ({
  children,
  openRef,
  closeButtonLabel,
  onCloseButtonClick = functionNoop,
  onOverlayClick = functionNoop,
}: PropertyCardMenuModalComponentPropsInterface): JSX.Element => {
  const closeRef = useRef<() => void>(functionNoop);

  return (
    <ModalComponent openRef={openRef} closeRef={closeRef} overlay>
      <PropertyCardMenuModalTemplate
        closeButtonLabel={closeButtonLabel}
        onCloseButtonClick={(): void => {
          closeRef.current();
          onCloseButtonClick();
        }}
        onOverlayClick={(): void => {
          closeRef.current();
          onOverlayClick();
        }}
      >
        {children}
      </PropertyCardMenuModalTemplate>
    </ModalComponent>
  );
};
