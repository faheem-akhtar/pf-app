import React, { Fragment } from 'react';

import { useTranslation } from 'helpers/translation/hook';

import styles from './calling-agent-modal-info.module.scss';
import { CallingAgentModalInfoComponentPropsInterface } from './component-props.interface';

export const CallingAgentModalInfoComponent: React.FunctionComponent<CallingAgentModalInfoComponentPropsInterface> = ({
  referenceId,
  avatar,
  languages,
  name,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.container} data-testid='agent-info-component-details'>
      <div className={styles.avatar}>
        <picture className={styles['avatar-image']}>
          <source srcSet={avatar} type='image/jpeg' />
          <img className={styles['avatar-image']} src={avatar} alt={name} />
        </picture>
      </div>
      <div className={styles.text}>
        <span className={styles['text-name']}>{name}</span>
        <p className={styles['text-description']}>
          {languages?.length ? (
            <Fragment>
              {`${t('speaks')}: ${languages.join(', ')}`}
              <br />
            </Fragment>
          ) : null}
          {t('reference')}: <span className={styles['text-ref']}>{referenceId}</span>
        </p>
      </div>
    </div>
  );
};
