import { useRef, useState } from 'react';

import { ModalComponent } from 'components/modal/component';
import { propertySerpObfuscatedGetUrl } from 'components/property/serp/obfuscated/get/url';
import { domClassMerge } from 'helpers/dom/class-merge';
import { functionNoop } from 'helpers/function/noop';
import { ButtonComponentTypeEnum } from 'library/button/component-type.enum';
import { ButtonSizeEnum } from 'library/button/size.enum';
import { ButtonTemplate } from 'library/button/template';

import { PropertyShareComponentPropsInterface } from './component-props.interface';
import { PropertyShareEmailComponent } from './email/component';
import styles from './property-share.module.scss';
import { PropertyShareSocialComponent } from './social/component';

export const PropertyShareComponent = ({ t, openRef, property }: PropertyShareComponentPropsInterface): JSX.Element => {
  const [shareViaEmail, setShareViaEmail] = useState(false);
  const closeRef = useRef<() => void>(functionNoop);

  const propertyUrl = propertySerpObfuscatedGetUrl(property);

  const closeModal = (): void => {
    setShareViaEmail(false);
    closeRef.current();
  };

  return (
    <ModalComponent
      openRef={openRef}
      closeRef={closeRef}
      overlay
      containerClassName={styles.overlay}
      onOverlayClick={closeModal}
    >
      <div
        data-testid='property-share'
        className={styles.container}
        onClick={(e): void => {
          e.stopPropagation();
        }}
      >
        <div
          className={domClassMerge(styles.title, {
            [styles['title--right']]: !shareViaEmail,
          })}
        >
          {shareViaEmail && <h1 className={styles.emailTitle}>{t('cta-share')}</h1>}
          <ButtonTemplate
            className={styles.close}
            onClick={closeModal}
            type='button'
            componentType={ButtonComponentTypeEnum.secondaryBlue}
            size={ButtonSizeEnum.small}
          >
            {t('close')}
          </ButtonTemplate>
        </div>
        {!shareViaEmail ? (
          <PropertyShareSocialComponent
            propertyUrl={propertyUrl}
            t={t}
            onClickEmail={(): void => {
              setShareViaEmail(true);
            }}
          />
        ) : (
          <PropertyShareEmailComponent onClickClose={closeModal} property={property} t={t} />
        )}
      </div>
    </ModalComponent>
  );
};
