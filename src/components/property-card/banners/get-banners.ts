/* TODO-FE: CX-768
import { newProjectsPropertyGetIsNewProperty } from 'common/helper/new-projects-property/get-is-new-property'; */

import { propertySerpObfuscatedGetLiveEventValue } from 'components/property/serp/obfuscated/get/live-event-value';
import { propertySerpObfuscatedGetVerified } from 'components/property/serp/obfuscated/get/verified';
import { PropertySerpObfuscatedType } from 'components/property/serp/obfuscated/type';
import { TFunctionType } from 'types/t-function/type';

import { PropertyCardBannersBannerInterface } from './banner.interface';
import { PropertyCardBannersBannerClassEnum } from './banner-class.enum';
import { PropertyCardBannersBannerTextEnum } from './banner-text.enum';
import { PROPERTY_CARD_BANNERS_MAX_AVAILABLE_COUNT } from './max-available-count.constant';

export function propertyCardBannersGetBanners(
  property: PropertySerpObfuscatedType,
  t: TFunctionType
): PropertyCardBannersBannerInterface[] {
  const list: PropertyCardBannersBannerInterface[] = [];
  if (propertySerpObfuscatedGetVerified(property)) {
    list.push({
      text: t(PropertyCardBannersBannerTextEnum.VERIFIED),
      colorClass: PropertyCardBannersBannerClassEnum.VERIFIED,
    });
  }

  /*   TODO-FE: CX-768
  if (property.new_projects) {
    list.push({
      text: t(PropertyCardBannersBannerTextEnum.NEW),
      colorClass: PropertyCardBannersBannerClassEnum.NEW,
    });
  }

  
  if (newProjectsPropertyGetIsNewProperty(property)) {
    list.push({
      text: t(PropertyCardBannersBannerTextEnum.FROM_DEVELOPER),
      colorClass: PropertyCardBannersBannerClassEnum.FROM_DEVELOPER,
    });
  } */

  if (propertySerpObfuscatedGetLiveEventValue(property)) {
    list.push({
      text: t(PropertyCardBannersBannerTextEnum.LIVE_VIEWING),
      colorClass: PropertyCardBannersBannerClassEnum.LIVE_VIEWING,
    });
  }

  // Only 3 banners can be shown at any given time
  return list.slice(0, PROPERTY_CARD_BANNERS_MAX_AVAILABLE_COUNT);
}
