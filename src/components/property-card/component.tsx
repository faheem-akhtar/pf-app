import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';

import { useApiPropertyImages } from 'api/property/images/hook';
import { CallingAgentModalComponent } from 'components/calling-agent-modal/component';
import { ContactedPropertyContext } from 'components/contacted-property/context';
import { EmailAgentModalComponent } from 'components/email-agent-modal/component';
import { FiltersContext } from 'components/filters/context';
import { PropertyReportComponent } from 'components/property/report/component';
import { propertySerpObfuscatedGetAreaValue } from 'components/property/serp/obfuscated/get/area-value';
import { propertySerpObfuscatedGetBathroomValue } from 'components/property/serp/obfuscated/get/bathroom-value';
import { propertySerpObfuscatedGetBedroomValue } from 'components/property/serp/obfuscated/get/bedroom-value';
import { propertySerpObfuscatedGetContactOptionsList } from 'components/property/serp/obfuscated/get/contact-options-list';
import { propertySerpObfuscatedGetId } from 'components/property/serp/obfuscated/get/id';
import { propertySerpObfuscatedGetImagesCount } from 'components/property/serp/obfuscated/get/images-count';
import { propertySerpObfuscatedGetImgUrl } from 'components/property/serp/obfuscated/get/img-url';
import { propertySerpObfuscatedGetLocationTreePath } from 'components/property/serp/obfuscated/get/location-tree-path';
import { propertySerpObfuscatedGetName } from 'components/property/serp/obfuscated/get/name';
import { propertySerpObfuscatedGetPriceText } from 'components/property/serp/obfuscated/get/price-text';
import { propertySerpObfuscatedGetPropertyTypeName } from 'components/property/serp/obfuscated/get/property-type-name';
import { propertySerpObfuscatedGetPublishDateValue } from 'components/property/serp/obfuscated/get/publish-date-value';
import { propertySerpObfuscatedGetReference } from 'components/property/serp/obfuscated/get/reference';
import { propertySerpObfuscatedGetUrl } from 'components/property/serp/obfuscated/get/url';
import { propertySerpObfuscatedGetUtilitiesPriceTypeName } from 'components/property/serp/obfuscated/get/utilities-price-type-name';
import { SavedPropertyContext } from 'components/saved-property/context';
import { ContactedPropertyTypeEnum } from 'enums/contacted-property/type.enum';
import { LanguageCodeEnum } from 'enums/language/code.enum';
import { arrayFromRange } from 'helpers/array/from-range';
import { dateToLocale } from 'helpers/date/to-locale';
import { functionNoop } from 'helpers/function/noop';
import { useTranslation } from 'helpers/translation/hook';
import { LocaleService } from 'services/locale/service';
import { TealiumConversionEventFactory } from 'services/tealium/conversion-event-factory';
import { PropertySearchStatsDataPromiseForCurrentQueryContext } from 'views/property-search/stats-data-promise-for-current-query/context';

import { PropertyShareComponent } from '../property/share/component';
import { propertyCardBannersGetBanners } from './banners/get-banners';
import { PropertyCardComponentPropsType } from './component-props.type';
import { PropertyCardMenuContentTemplate } from './menu/content/template';
import { PropertyCardMenuModalComponent } from './menu/modal/component';
import styles from './property-card.module.scss';
import { PropertyCardTemplate } from './template';
import { PropertyCardTemplatePropsType } from './template-props.type';
import { usePropertyCardTrackVisibilityOnScreen } from './track-visibility-on-screen.hook';
import { PropertyCardTypeEnum } from './type.enum';

export const PropertyCardComponent = ({
  property,
  loading,
  onSaveButtonClick,
  onPropertyClick,
  cardType = PropertyCardTypeEnum.classic,
}: PropertyCardComponentPropsType): JSX.Element => {
  const { locale } = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [galleryImagesShouldFetch, setGalleryImagesShouldFetch] = useState(false);
  const [isPropertySaved, setIsPropertySaved] = useState(false);
  const statsDataPromise = useContext(PropertySearchStatsDataPromiseForCurrentQueryContext);
  const { t } = useTranslation();
  const propertyId = propertySerpObfuscatedGetId(property);
  const savedProperties = useContext(SavedPropertyContext);
  const contactedProperty = useContext(ContactedPropertyContext);
  const filterContext = useContext(FiltersContext);
  const contactDate = contactedProperty.data.find(
    (property) => property.propertyId === parseInt(propertyId, 10)
  )?.contactDate;

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [showBanners, setShowBanners] = useState(() => true);
  const [galleryIndex, setGalleryIndex] = useState<number>(0);

  const callingAgentModalOpenRef = useRef<() => void>(functionNoop);
  const emailAgentModalOpenRef = useRef<() => void>(functionNoop);
  const menuModalOpenRef = useRef<() => void>(functionNoop);
  const socialShareOpenRef = useRef<() => void>(functionNoop);
  const propertyReportOpenRef = useRef<() => void>(functionNoop);
  const imagesResponse = useApiPropertyImages(propertyId, 'medium', galleryImagesShouldFetch);

  const tealiumEvents = TealiumConversionEventFactory(property, filterContext.value, {
    isTransactionalEvent: true,
  });

  const propertyImagesCount = propertySerpObfuscatedGetImagesCount(property);
  const galleryProps = {
    items: imagesResponse.ok
      ? imagesResponse.data.map((sourceUrl) => ({ sourceUrl }))
      : propertyImagesCount
      ? [
          { sourceUrl: propertySerpObfuscatedGetImgUrl(property) },
          ...arrayFromRange(0, propertyImagesCount - 1).map(() => ({
            sourceUrl: '',
          })),
        ]
      : [],
    isRtl: locale === LanguageCodeEnum.ar,
    onDrag: (): void => setGalleryImagesShouldFetch(true),
    // TODO-FE[CX-991] Add AB test value
    cardType,
  };

  const sendLead = (medium: any): void => {
    statsDataPromise.then((result) => {
      if (result.ok) {
      } else {
        // eslint-disable-next-line no-console
        console.error('Unable to send lead because stats data failed to load');
      }
    });
  };

  const { phone, email, whatsapp } = propertySerpObfuscatedGetContactOptionsList(property);

  const bedsValue = propertySerpObfuscatedGetBedroomValue(property);
  const bathsValue = propertySerpObfuscatedGetBathroomValue(property);

  const cardTemplateProps: PropertyCardTemplatePropsType = {
    // TODO-FE[CX-991] Implement conditionally rendering templates by AB test value
    cardType,
    loading,
    gallery: galleryProps,
    saved: isPropertySaved,
    contactDate: contactDate && dateToLocale(contactDate, LocaleService.getLocale()),
    type: propertySerpObfuscatedGetPropertyTypeName(property),
    price: propertySerpObfuscatedGetPriceText(property),
    customTitle: propertySerpObfuscatedGetName(property),
    location: propertySerpObfuscatedGetLocationTreePath(property),
    bathrooms:
      typeof bathsValue === 'number' && bathsValue > 0 ? t('n-bathroom', { count: bathsValue }, bathsValue > 7) : null,
    bedrooms: typeof bedsValue === 'number' ? t('n-bedroom', { count: bedsValue }, bedsValue > 7) : bedsValue,
    area: propertySerpObfuscatedGetAreaValue(property),
    publishDate: `${t('Listed')} ${propertySerpObfuscatedGetPublishDateValue(property)}`,
    href: `${propertySerpObfuscatedGetUrl(property)}?ref=listing`,
    banners: propertyCardBannersGetBanners(property, t),
    showBanners,
    utilitiesPriceType: propertySerpObfuscatedGetUtilitiesPriceTypeName(property),

    ...(phone
      ? {
          onCallClick: (): void => {
            sendLead('phone');
            tealiumEvents.sendCallEvent();
            callingAgentModalOpenRef.current();
            contactedProperty.add(parseInt(propertyId, 10), ContactedPropertyTypeEnum.call);
          },
          phoneNumber: phone.link,
        }
      : {}),
    ...(email
      ? {
          onEmailClick: (): void => {
            sendLead('email');
            emailAgentModalOpenRef.current();
            contactedProperty.add(parseInt(propertyId, 10), ContactedPropertyTypeEnum.email);
          },
        }
      : {}),
    ...(whatsapp
      ? {
          onWhatsappClick: (): void => {
            sendLead('whatsapp');
            tealiumEvents.sendWhatsappEvent();
            contactedProperty.add(parseInt(propertyId, 10), ContactedPropertyTypeEnum.whatsApp);
          },
          whatsAppLink: whatsapp.link,
        }
      : {}),

    onSaveButtonClick: (): void => {
      onSaveButtonClick(propertyId, !isPropertySaved);
      savedProperties.toggle(propertyId);
      if (!isPropertySaved) {
        tealiumEvents.sendSavePropertyEvent();
      }
    },
    onMenuButtonClick: (): void => {
      menuModalOpenRef.current();
    },
    t,
    onGalleryIndexChange: (index: number, length: number) => {
      tealiumEvents.sendGalleryScrollEvent(propertyId, length);
      setGalleryIndex(index);
    },
    onGalleryClick: (): void => {
      onPropertyClick();
      window.location.href = cardTemplateProps.href;
    },
    onPropertyLinkClick: onPropertyClick,
  };

  // Handles banner animation
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (galleryIndex === 0) {
      setShowBanners(galleryIndex === 0);
    } else {
      setShowBanners(false);
      timeoutRef.current = setTimeout(() => {
        setShowBanners(true);
      }, 3000);
    }
    return (): void => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [galleryIndex]);

  useEffect(() => {
    setIsPropertySaved(!!savedProperties.data.find((property) => property.propertyId === parseInt(propertyId, 10)));
  }, [savedProperties.data, propertyId]);

  usePropertyCardTrackVisibilityOnScreen(statsDataPromise, property, containerRef);

  return (
    <div data-testid='list-item' ref={containerRef} className={styles.item}>
      <PropertyCardTemplate {...cardTemplateProps} />
      <EmailAgentModalComponent
        openRef={emailAgentModalOpenRef}
        property={property}
        onFormSubmitted={(email, isAlertEnabled): void => {
          tealiumEvents.sendEmailEvent();
          if (isAlertEnabled) {
            tealiumEvents.sendEmailSignupEvent(email);
          }
        }}
      />
      <CallingAgentModalComponent
        property={property}
        referenceId={propertySerpObfuscatedGetReference(property)}
        openRef={callingAgentModalOpenRef}
      />
      <PropertyCardMenuModalComponent closeButtonLabel={t('cta-cancel')} openRef={menuModalOpenRef}>
        <PropertyCardMenuContentTemplate
          t={t}
          reportOpenRef={propertyReportOpenRef}
          socialShareOpenRef={socialShareOpenRef}
        />
        <PropertyShareComponent property={property} t={t} openRef={socialShareOpenRef} />
        <PropertyReportComponent propertyId={propertyId} t={t} openRef={propertyReportOpenRef} />
      </PropertyCardMenuModalComponent>
    </div>
  );
};
