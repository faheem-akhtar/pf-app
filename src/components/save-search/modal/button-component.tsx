import { useContext, useEffect, useRef, useState } from 'react';

import { AuthModalComponent } from 'components/auth/modal/component';
import { IconThinStarTemplate } from 'components/icon/thin/star-template';
import { ModalComponent } from 'components/modal/component';
import { SnackbarContext } from 'components/snackbar/context';
import { UserContext } from 'context/user/context';
import { useTranslation } from 'helpers/translation/hook';
import { ButtonComponentTypeEnum } from 'library/button/component-type.enum';
import { ButtonIconPositionEnum } from 'library/button/icon-position.enum';
import { ButtonSizeEnum } from 'library/button/size.enum';
import { ButtonTemplate } from 'library/button/template';

import { SaveSearchContext } from '../context';
import { SaveSearchModalContentComponent } from './content-component';
import styles from './save-search-modal-component.module.scss';

export const SaveSearchModalButtonComponent = (): JSX.Element => {
  const { t } = useTranslation();
  const user = useContext(UserContext);
  const snackbar = useContext(SnackbarContext);
  const saveSearch = useContext(SaveSearchContext);
  const [autoOpenDialog, setAutoOpenDialog] = useState(false);
  const openFiltersRef = useRef<() => void>(() => null);
  const closeFiltersRef = useRef<() => void>(() => null);
  const openLoginRef = useRef<() => void>(() => null);
  const closeLoginRef = useRef<() => void>(() => null);

  const openDialog = (): void => {
    if (user) {
      openFiltersRef.current();
    } else {
      openLoginRef.current();
      setAutoOpenDialog(true);
    }
  };

  useEffect(() => {
    if (autoOpenDialog && user) {
      closeLoginRef.current();
      if (saveSearch.filtered.length === 0) {
        openDialog();
      } else {
        snackbar.alert({ message: t('save_search/exist-notification') });
      }
      setAutoOpenDialog(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoOpenDialog, user, saveSearch.filtered]);

  return (
    <>
      <ButtonTemplate
        type='button'
        componentType={ButtonComponentTypeEnum.tertiary}
        size={ButtonSizeEnum.small}
        onClick={(): void => {
          if (saveSearch.filtered.length === 0) {
            openDialog();
          }
        }}
        icon={{
          component: IconThinStarTemplate,
          position: ButtonIconPositionEnum.left,
          className: saveSearch.filtered.length ? styles.icon__active : styles.icon__inactive,
        }}
      >
        {t('save-search/cta-label')}
      </ButtonTemplate>
      <ModalComponent openRef={openFiltersRef} closeRef={closeFiltersRef}>
        <SaveSearchModalContentComponent close={(): void => closeFiltersRef.current()} />
      </ModalComponent>
      <ModalComponent openRef={openLoginRef} closeRef={closeLoginRef} overlay>
        <AuthModalComponent
          cancel={(): void => {
            closeLoginRef.current();
            setAutoOpenDialog(false);
          }}
        />
      </ModalComponent>
    </>
  );
};
