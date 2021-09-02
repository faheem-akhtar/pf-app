import Head from 'next/head';

import { configAdsGptUnits } from 'config/ads/gpt/units';
import { propertySerpObfuscatedGetImgUrl } from '../serp/obfuscated/get/img-url';
import { useServicesDfpAds } from 'services/dfp/ads.hook';

import { PropertyCardComponent } from 'components/property-card/component';
import { PropertyListAdPlaceholderTemplate } from './ad-placeholder-template';
import { PropertyListComponentPropsInterface } from './component-props.interface';
import { PropertyListItemType } from './item/type';
import { PropertyListItemTypeEnum } from './item/type.enum';
import { propertySerpObfuscatedGetUrl } from '../serp/obfuscated/get/url';
import { PropertySerpObfuscatedType } from '../serp/obfuscated/type';

const NUMBER_OF_IMAGES_TO_PRELOAD = 3;

export const PropertyListComponent: React.FunctionComponent<PropertyListComponentPropsInterface> = (props) => {
  const { properties, adConfig, pageIsLoading } = props;

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
            />
          );
        })}
      </div>
    </>
  );
};
