import Image from 'next/image';
import { FunctionComponent } from 'react';

import { useTranslation } from 'helpers/translation/hook';

import styles from './calling-agent-modal-info.module.scss';
import { CallingAgentModalInfoComponentPropsInterface } from './component-props.interface';

export const CallingAgentModalInfoComponent: FunctionComponent<CallingAgentModalInfoComponentPropsInterface> = ({
  referenceId,
  imageSrc,
  languages,
  name,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles['image-container']}>
        {imageSrc ? (
          <picture>
            <source srcSet={imageSrc} type='image/jpeg' />
            <img className={styles.image} src={imageSrc} alt={name} />
          </picture>
        ) : (
          <Image
            src='/static/images/agent-image-placeholder.jpg'
            width={70}
            height={70}
            objectFit='cover'
            alt='Picture of the agent'
          />
        )}
      </div>
      <div className={styles.content}>
        <p className={styles.name}>{name}</p>
        <p className={styles.description}>
          {languages?.length ? (
            <>
              {`${t('speaks')}: ${languages.join(', ')}`}
              <br />
            </>
          ) : null}
          {t('reference')}: <span className={styles.ref}>{referenceId}</span>
        </p>
      </div>
    </div>
  );
};
