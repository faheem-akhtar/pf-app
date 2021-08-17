import { useRef } from 'react';

import { functionNoop } from 'helpers/function/noop';

import { ButtonComponentTypeEnum } from 'library/button/component-type.enum';
import { ButtonSizeEnum } from 'library/button/size.enum';
import { ButtonTemplate } from 'library/button/template';
import { CallingAgentModalComponentPropsInterface } from './component-props.interface';
import { IconThickCrossTemplate } from 'components/icon/thick/cross-template';
import { ModalComponent } from 'components/modal/component';

// TODO-FE[TPNX-3179] Implement Calling agent modal
export const CallingAgentModalComponent: React.FunctionComponent<CallingAgentModalComponentPropsInterface> = ({
  openRef,
}) => {
  const closeRef = useRef<() => void>(functionNoop);

  return (
    <ModalComponent openRef={openRef} closeRef={closeRef}>
      <ButtonTemplate
        type='button'
        size={ButtonSizeEnum.small}
        componentType={ButtonComponentTypeEnum.tertiary}
        onClick={(): void => closeRef.current()}
      >
        <IconThickCrossTemplate />
      </ButtonTemplate>
    </ModalComponent>
  );
};
