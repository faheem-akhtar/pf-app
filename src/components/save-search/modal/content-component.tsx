import { IconThickCloseTemplate } from 'components/icon/thick/close-template';
import { SaveSearchFormComponent } from '../form/component';

import styles from './save-search-modal-component.module.scss';

export const SaveSearchModalContentComponent = ({ close }: { close: () => void }): JSX.Element => {
  return (
    <div className={styles.content}>
      <SaveSearchFormComponent onSubmit={close} />
      <div className={styles.close} onClick={close}>
        <IconThickCloseTemplate class={styles.closeIcon} />
      </div>
    </div>
  );
};
