import Head from 'next/head';
import React, { useContext, useRef } from 'react';

import { AuthModalComponent } from 'components/auth/modal/component';
import { AuthScreenEnum } from 'components/auth/screen.enum';
import { ModalComponent } from 'components/modal/component';
import { PropertyCardComponent } from 'components/property-card/component';
import { SavedPropertyAuthLoginTemplate } from 'components/saved-property/auth/login/template';
import { SAVED_PROPERTY_AUTH_MODAL_STORAGE_KEY } from 'components/saved-property/auth/modal/storage-key.constant';
import { savedPropertyTracker } from 'components/saved-property/tracker';
import { configAdsGptUnits } from 'config/ads/gpt/units';
import { UserContext } from 'context/user/context';
import { functionNoop } from 'helpers/function/noop';
import { useServicesDfpAds } from 'services/dfp/ads.hook';
import { WindowService } from 'services/window/service';

import { PROPERTY_SERP_NO_OF_PRELOAD_IMAGES } from '../serp/no-of-preload-images.constant';
import { propertySerpObfuscatedGetImgUrl } from '../serp/obfuscated/get/img-url';
import { propertySerpObfuscatedGetUrl } from '../serp/obfuscated/get/url';
import { PropertySerpObfuscatedType } from '../serp/obfuscated/type';
import { PropertyTrackerFactory } from '../tracker.factory';
import { PropertyListAdPlaceholderTemplate } from './ad-placeholder-template';
import { PropertyListComponentPropsInterface } from './component-props.interface';
import { PropertyListItemType } from './item/type';
import { PropertyListItemTypeEnum } from './item/type.enum';
import styles from './property-list.module.scss';

export const PropertyListComponent: React.FunctionComponent<PropertyListComponentPropsInterface> = (props) => {
  const { properties, adConfig, pageIsLoading } = props;
  const { sessionStorage } = WindowService;
  const propertyTracker = PropertyTrackerFactory();
  const user = useContext(UserContext);

  const authModalOpenRef = useRef<() => void>(functionNoop);
  const authModalCloseRef = useRef<() => void>(functionNoop);

  const items: PropertyListItemType[] = properties.map((property: PropertySerpObfuscatedType) => ({
    type: PropertyListItemTypeEnum.property,
    property,
  }));

  configAdsGptUnits.forEach((unit) => {
    if (unit.position !== undefined) {
      items.splice(unit.position, 0, { type: PropertyListItemTypeEnum.ad, id: unit.id });
    }
  });

  useServicesDfpAds(adConfig);

  const PreloadImages = (): JSX.Element => (
    <Head>
      {properties.slice(0, PROPERTY_SERP_NO_OF_PRELOAD_IMAGES).map((p, index) => (
        <link
          key={index}
          rel='preload'
          href={propertySerpObfuscatedGetImgUrl(p).replace(/\.jpg\b/, '.webp')}
          as='image'
        />
      ))}
    </Head>
  );

  return (
    <>
      <PreloadImages />
      <div className={styles.container}>
        {items.map((item, index) => {
          if (item.type === 'ad') {
            return <PropertyListAdPlaceholderTemplate id={item.id} key={index} />;
          }

          return (
            <PropertyCardComponent
              key={`${propertySerpObfuscatedGetUrl(item.property)}-${index}`}
              property={item.property}
              loading={pageIsLoading}
              onSaveButtonClick={(propertyId, isSaved): void => {
                if (isSaved && !sessionStorage.getItem(SAVED_PROPERTY_AUTH_MODAL_STORAGE_KEY) && !user) {
                  authModalOpenRef.current();
                  sessionStorage.setItem(SAVED_PROPERTY_AUTH_MODAL_STORAGE_KEY, { propertyId });
                  savedPropertyTracker.onOpenUserAuthModal();
                }
              }}
              onPropertyClick={(): void => propertyTracker.click(item.property)}
            />
          );
        })}
        <ModalComponent openRef={authModalOpenRef} closeRef={authModalCloseRef} overlay>
          <AuthModalComponent
            eventLabel='Property Serp - Post Call Lead'
            initialScreen={AuthScreenEnum.shortLogin}
            loginTemplate={SavedPropertyAuthLoginTemplate}
            close={(): void => authModalCloseRef.current()}
          />
        </ModalComponent>
      </div>
    </>
  );
};
