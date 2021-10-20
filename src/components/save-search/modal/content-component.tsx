import { useRouter } from 'next/router';
import { useContext } from 'react';

import { IconThickCloseTemplate } from 'components/icon/thick/close-template';
import { SnackbarContext } from 'components/snackbar/context';
import { localeGetHref } from 'helpers/locale/get-href';
import { useTranslation } from 'helpers/translation/hook';

import { SaveSearchFormComponent } from '../form/component';
import styles from './save-search-modal-component.module.scss';

export const SaveSearchModalContentComponent = ({ close }: { close: () => void }): JSX.Element => {
  const snackbar = useContext(SnackbarContext);
  const locale = useRouter().locale as string;
  const { t } = useTranslation();

  return (
    <div className={styles.content}>
      <SaveSearchFormComponent
        onSuccess={(): void => {
          snackbar.alert({
            message: t('save_search/create-success_notification'),
            action: (
              <a href={localeGetHref(locale, '/user/saved-searches', true)}>{t('save_search/manage-cta-label')}</a>
            ),
          });
          close();
        }}
      />
      <div className={styles.close} onClick={close}>
        <IconThickCloseTemplate class={styles.closeIcon} />
      </div>
    </div>
  );
};
