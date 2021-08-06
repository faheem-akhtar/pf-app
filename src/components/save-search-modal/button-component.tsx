import { useRef, useState } from 'react';

import { useTranslation } from 'next-i18next';

import { ButtonComponentTypeEnum } from 'library/button/component-type.enum';
import { ButtonIconPositionEnum } from 'library/button/icon-position.enum';
import { ButtonSizeEnum } from 'library/button/size.enum';
import { ButtonTemplate } from 'library/button/template';
import { IconStarTemplate } from 'components/icon/star-template';
import { ModalComponent } from 'components/modal/component';

import styles from './save-search-modal-component.module.scss';

export const SaveSearchModalButtonComponent = (): JSX.Element => {
  const openFiltersRef = useRef<() => void>(() => null);
  const closeFiltersRef = useRef<() => void>(() => null);
  const { t } = useTranslation();

  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <ButtonTemplate
        type='button'
        componentType={ButtonComponentTypeEnum.tertiary}
        size={ButtonSizeEnum.small}
        onClick={(): void => setIsActive(!isActive)}
        icon={{
          component: IconStarTemplate,
          position: ButtonIconPositionEnum.left,
          className: isActive ? styles.icon__active : styles.icon__inactive,
        }}
      >
        {t('save-search-btn')}
      </ButtonTemplate>
      <ModalComponent openRef={openFiltersRef} closeRef={closeFiltersRef}>
        TODO-FE[TPNX-3151] Save search
      </ModalComponent>
    </>
  );
};