import { Fragment, useState } from 'react';

import { IconThinCheckmarkCircleTemplate } from 'components/icon/thin/checkmark-circle-template';
import { propertySerpObfuscatedGetId } from 'components/property/serp/obfuscated/get/id';
import { propertySerpObfuscatedGetImgUrl } from 'components/property/serp/obfuscated/get/img-url';
import { propertySerpObfuscatedGetName } from 'components/property/serp/obfuscated/get/name';
import { ButtonComponentTypeEnum } from 'library/button/component-type.enum';
import { ButtonSizeEnum } from 'library/button/size.enum';
import { ButtonTemplate } from 'library/button/template';

import { propertyShareTracker } from '../tracker';
import { PropertyShareEmailComponentPropsInterface } from './component-props.interface';
import { PropertyShareEmailFormComponent } from './form/component';
import styles from './property-share-email.module.scss';

export const PropertyShareEmailComponent = ({
  property,
  t,
  onClickClose,
}: PropertyShareEmailComponentPropsInterface): JSX.Element => {
  const [isFormSent, setIsFormSent] = useState(false);
  const propertyImageUrl = propertySerpObfuscatedGetImgUrl(property);
  const propertyName = propertySerpObfuscatedGetName(property);

  if (!isFormSent) {
    return (
      <Fragment>
        <div className={styles.info}>
          <div className={styles.imageContainer}>
            <picture className={styles.image}>
              <img src={propertyImageUrl} className={styles.image} alt={propertyName} />
            </picture>
          </div>
          <div className={styles.title}>{propertyName}</div>
        </div>
        <PropertyShareEmailFormComponent
          t={t}
          propertyId={propertySerpObfuscatedGetId(property)}
          onFormSubmitted={(): void => {
            setIsFormSent(true);
            propertyShareTracker.onSuccessSocialShare('Email');
          }}
        />
      </Fragment>
    );
  }

  return (
    <div className={styles.success}>
      <div className={styles.successContent}>
        <IconThinCheckmarkCircleTemplate class={styles.successIcon} />
        <div className={styles.successContent}>
          <p>{t('thank-you')}</p>
          <p>{t('your-message-is-sent')}</p>
        </div>
      </div>
      <ButtonTemplate
        type='button'
        size={ButtonSizeEnum.regular}
        componentType={ButtonComponentTypeEnum.primary}
        onClick={onClickClose}
        fullWidth
      >
        {t('close')}
      </ButtonTemplate>
    </div>
  );
};
