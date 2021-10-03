import Head from 'next/head';
import { useRef } from 'react';

import { ModalComponent } from 'components/modal/component';
import { PropertyCardComponent } from 'components/property-card/component';
import { SavedPropertyAuthModalComponent } from 'components/saved-property/auth/modal/component';
import { savedPropertyAuthModalStorageKey } from 'components/saved-property/auth/modal/storage-key';
import { savedPropertyTracker } from 'components/saved-property/tracker';
import { configAdsGptUnits } from 'config/ads/gpt/units';
import { functionNoop } from 'helpers/function/noop';
import { useServicesDfpAds } from 'services/dfp/ads.hook';
import { WindowService } from 'services/window/service';

import { propertySerpObfuscatedGetImgUrl } from '../serp/obfuscated/get/img-url';
import { propertySerpObfuscatedGetUrl } from '../serp/obfuscated/get/url';
import { PropertySerpObfuscatedType } from '../serp/obfuscated/type';
import { PropertyListAdPlaceholderTemplate } from './ad-placeholder-template';
import { PropertyListComponentPropsInterface } from './component-props.interface';
import { PropertyListItemType } from './item/type';
import { PropertyListItemTypeEnum } from './item/type.enum';

const NUMBER_OF_IMAGES_TO_PRELOAD = 3;

export const PropertyListComponent: React.FunctionComponent<PropertyListComponentPropsInterface> = (props) => {
  const { properties, adConfig, pageIsLoading } = props;
  const { sessionStorage } = WindowService;

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
      {properties.slice(0, NUMBER_OF_IMAGES_TO_PRELOAD).map((p, index) => (
        <link key={index} rel='preload' href={propertySerpObfuscatedGetImgUrl(p)} as='image' />
      ))}
    </Head>
  );

  return (
    <>
      <PreloadImages />
      <div>
        {items.map((item, index) => {
          if (item.type === 'ad') {
            return <PropertyListAdPlaceholderTemplate id={item.id} key={index} />;
          }

          return (
            <PropertyCardComponent
              key={propertySerpObfuscatedGetUrl(item.property)}
              property={item.property}
              loading={pageIsLoading}
              onSaveButtonClick={(propertyId, isSaved): void => {
                if (isSaved && !sessionStorage.getItem(savedPropertyAuthModalStorageKey)) {
                  authModalOpenRef.current();
                  sessionStorage.setItem(savedPropertyAuthModalStorageKey, { propertyId });
                  savedPropertyTracker.onOpenUserAuthModal();
                }
              }}
            />
          );
        })}
        <ModalComponent openRef={authModalOpenRef} closeRef={authModalCloseRef} overlay>
          <SavedPropertyAuthModalComponent onClose={(): void => authModalCloseRef.current()} />
        </ModalComponent>
      </div>
    </>
  );
};
