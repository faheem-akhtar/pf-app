import { useRef, useState } from 'react';

import { domClassMerge } from 'helpers/dom/class-merge';
import { functionNoop } from 'helpers/function/noop';
import { propertySerpObfuscatedGetUrl } from 'components/property/serp/obfuscated/get/url';

import { ModalComponent } from 'components/modal/component';
import { PropertyShareComponentPropsInterface } from './component-props.interface';
import { PropertyShareEmailComponent } from './email/component';
import { PropertyShareSocialComponent } from './social/component';
import styles from './property-share.module.scss';

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
          {shareViaEmail && <span className={styles.emailTitle}>{t('cta-share')}</span>}
          <span className={styles.close} onClick={closeModal}>
            {t('close')}
          </span>
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
