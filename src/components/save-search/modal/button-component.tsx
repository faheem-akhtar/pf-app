import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';

import { IconThinStarTemplate } from 'components/icon/thin/star-template';
import { ModalComponent } from 'components/modal/component';
import { SnackbarContext } from 'components/snackbar/context';
import { UserContext } from 'components/user/context';
import { functionNoop } from 'helpers/function/noop';
import { localeGetHref } from 'helpers/locale/get-href';
import { useTranslation } from 'helpers/translation/hook';
import { ButtonComponentTypeEnum } from 'library/button/component-type.enum';
import { ButtonIconPositionEnum } from 'library/button/icon-position.enum';
import { ButtonSizeEnum } from 'library/button/size.enum';
import { ButtonTemplate } from 'library/button/template';
import { OnBoardingComponent } from 'library/on-boarding/component';
import { OnBoardingTypeEnum } from 'library/on-boarding/type.enum';

import { SaveSearchContext } from '../context';
import { saveSearchTracker } from '../tracker';
import { SaveSearchModalAuthComponent } from './auth/component';
import { SaveSearchModalContentComponent } from './content-component';
import styles from './save-search-modal-component.module.scss';

export const SaveSearchModalButtonComponent = ({ visibleTooltip }: { visibleTooltip: boolean }): JSX.Element => {
  const { t } = useTranslation();
  const { locale } = useRouter();
  const user = useContext(UserContext);
  const snackbar = useContext(SnackbarContext);
  const saveSearch = useContext(SaveSearchContext);
  const [autoOpenDialog, setAutoOpenDialog] = useState(false);
  const openFiltersRef = useRef(functionNoop);
  const closeFiltersRef = useRef(functionNoop);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const isSearchAlreadySaved = !!saveSearch.filtered.length;

  const openDialog = (): void => {
    if (user) {
      openFiltersRef.current();
      saveSearchTracker.onOpenCreateDialog();
    } else {
      setIsAuthDialogOpen(true);
    }
  };

  useEffect(() => {
    if (autoOpenDialog && user) {
      if (!isSearchAlreadySaved) {
        openDialog();
      } else {
        snackbar.alert({
          message: t('save_search/exist-notification'),
          action: (
            <a href={localeGetHref(locale as string, '/user/saved-searches', true)}>
              {t('save_search/manage-cta-label')}
            </a>
          ),
        });
      }
      setAutoOpenDialog(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoOpenDialog, user]);

  return (
    <>
      <div className={styles.tooltipWrapper}>
        <ButtonTemplate
          type='button'
          componentType={ButtonComponentTypeEnum.tertiary}
          size={ButtonSizeEnum.small}
          disabled={isSearchAlreadySaved}
          onClick={(): void => {
            openDialog();
            saveSearchTracker.onClickCta();
          }}
          icon={{
            component: IconThinStarTemplate,
            position: ButtonIconPositionEnum.left,
            className: isSearchAlreadySaved ? styles.icon__active : styles.icon__inactive,
          }}
        >
          {t(isSearchAlreadySaved ? 'save-search/cta-label_active' : 'save-search/cta-label')}
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
      {isAuthDialogOpen && (
        <SaveSearchModalAuthComponent
          onCancel={(): void => setIsAuthDialogOpen(false)}
          onSuccess={(): void => {
            setAutoOpenDialog(true);
            setIsAuthDialogOpen(false);
          }}
        />
      )}
    </>
  );
};
