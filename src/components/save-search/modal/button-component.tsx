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
import { OnBoardingComponent } from 'library/on-boarding/component';
import { OnBoardingTypeEnum } from 'library/on-boarding/type.enum';
import { AuthService } from 'services/auth/service';
import { AuthSubscribeEventTypeEnum } from 'services/auth/subscribe-event-type.enum';
import { AuthSubscriberType } from 'services/auth/subscriber.type';

import { SaveSearchContext } from '../context';
import { saveSearchTracker } from '../tracker';
import { SaveSearchModalContentComponent } from './content-component';
import styles from './save-search-modal-component.module.scss';

export const SaveSearchModalButtonComponent = ({ visibleTooltip }: { visibleTooltip: boolean }): JSX.Element => {
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
      saveSearchTracker.onOpenCreateDialog();
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

  useEffect(() => {
    if (autoOpenDialog) {
      const onUpdate: AuthSubscriberType = (user, meta) => {
        if (user && meta?.eventType === AuthSubscribeEventTypeEnum.login) {
          saveSearchTracker.onSignInSuccess();
        }
        if (user && meta?.eventType === AuthSubscribeEventTypeEnum.register) {
          saveSearchTracker.onSignUpSuccess();
        }
      };
      const unsubscribeAuth = AuthService.subscribe(onUpdate);

      return (): void => unsubscribeAuth();
    }
  }, [autoOpenDialog]);

  return (
    <>
      <div className={styles.tooltipWrapper}>
        <ButtonTemplate
          type='button'
          componentType={ButtonComponentTypeEnum.tertiary}
          size={ButtonSizeEnum.small}
          onClick={(): void => {
            if (saveSearch.filtered.length === 0) {
              openDialog();
            }
            saveSearchTracker.onClickCta();
          }}
          icon={{
            component: IconThinStarTemplate,
            position: ButtonIconPositionEnum.left,
            className: saveSearch.filtered.length ? styles.icon__active : styles.icon__inactive,
          }}
        >
          {t('save-search/cta-label')}
        </ButtonTemplate>
        {visibleTooltip && (
          <OnBoardingComponent
            name={OnBoardingTypeEnum.saveSearchTooltip}
            className={styles.tooltip}
            arrowClassName={styles.tooltipArrow}
            onClose={(): void => {
              saveSearchTracker.onTooltipOpen();
              saveSearchTracker.onTooltipClose();
            }}
          >
            <>
              <p className={styles.tooltipTitle}>{t('on-boarding/save-search-title')}</p>
              {t('on-boarding/save-search-description')}
            </>
          </OnBoardingComponent>
        )}
      </div>
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
