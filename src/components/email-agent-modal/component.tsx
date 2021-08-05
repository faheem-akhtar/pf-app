import { useRef } from 'react';
import { useTranslation } from 'next-i18next';

import { functionNoop } from 'helpers/function/noop';

import { ButtonComponentTypeEnum } from 'library/button/component-type.enum';
import { ButtonSizeEnum } from 'library/button/size.enum';
import { ButtonTemplate } from 'library/button/template';
import { EmailAgentModalComponentPropsInterface } from './component-props.interface';
import { ModalComponent } from 'components/modal/component';

// TODO-FE[TPNX-3180] imlement Email agent modal
export const EmailAgentModalComponent: React.FunctionComponent<EmailAgentModalComponentPropsInterface> = ({
  openRef,
}) => {
  const { t } = useTranslation();
  const closeRef = useRef<() => void>(functionNoop);

  return (
    <ModalComponent openRef={openRef} closeRef={closeRef}>
      {t('Email agent')}
      <ButtonTemplate
        type='button'
        size={ButtonSizeEnum.small}
        componentType={ButtonComponentTypeEnum.tertiary}
        onClick={(): void => closeRef.current()}
      >
        {t('Close')}
      </ButtonTemplate>
    </ModalComponent>
  );
};
