import { useContext } from 'react';

import { IconThickCloseTemplate } from 'components/icon/thick/close-template';
import { SaveSearchFormComponent } from '../form/component';
import { SnackbarContext } from 'components/snackbar/context';
import { useTranslation } from 'helpers/translation/hook';

import styles from './save-search-modal-component.module.scss';

export const SaveSearchModalContentComponent = ({ close }: { close: () => void }): JSX.Element => {
  const snackbar = useContext(SnackbarContext);
  const { t } = useTranslation();

  return (
    <div className={styles.content}>
      <SaveSearchFormComponent
        onSuccess={(): void => {
          snackbar.alert({ message: t('save_search/create-success_notification') });
          close();
        }}
      />
      <div className={styles.close} onClick={close}>
        <IconThickCloseTemplate class={styles.closeIcon} />
      </div>
    </div>
  );
};
