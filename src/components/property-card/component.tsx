import { LeadMediumType } from '@propertyfinder/pf-frontend-common/dist/module/stats/types';
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';

import { useApiPropertyImages } from 'api/property-images/hook';
import { CallingAgentModalComponent } from 'components/calling-agent-modal/component';
import { ContactedPropertyContext } from 'components/contacted-property/context';
import { EmailAgentModalComponent } from 'components/email-agent-modal/component';
import { PropertyReportComponent } from 'components/property/report/component';
import { propertySerpObfuscatedGetId } from 'components/property/serp/obfuscated/get/id';
import { propertySerpObfuscatedGetImagesCount } from 'components/property/serp/obfuscated/get/images-count';
import { propertySerpObfuscatedGetImgUrlSmall } from 'components/property/serp/obfuscated/get/img-url-small';
import { propertySerpObfuscatedGetReference } from 'components/property/serp/obfuscated/get/reference';
import { SavedPropertyContext } from 'components/saved-property/context';
import { ContactedPropertyTypeEnum } from 'enums/contacted-property/type.enum';
import { LanguageCodeEnum } from 'enums/language/code.enum';
import { arrayFromRange } from 'helpers/array/from-range';
import { functionNoop } from 'helpers/function/noop';
import { useTranslation } from 'helpers/translation/hook';
import { StatsService } from 'services/stats/service';
import { PropertySearchStatsDataPromiseForCurrentQueryContext } from 'views/property-search/stats-data-promise-for-current-query/context';

import { PropertyShareComponent } from '../property/share/component';
import { PropertyCardComponentPropsType } from './component-props.type';
import { PropertyCardMenuContentTemplate } from './menu/content/template';
import { PropertyCardMenuModalComponent } from './menu/modal/component';
import { PropertyCardTemplate } from './template';
import { PropertyCardTemplatePropsType } from './template-props.type';
import { usePropertyCardTrackVisibilityOnScreen } from './track-visibility-on-screen.hook';

export const PropertyCardComponent = ({
  property,
  loading,
  onSaveButtonClick,
}: PropertyCardComponentPropsType): JSX.Element => {
  const { locale } = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [galleryHasBeenTouched, setGalleryHasBeenTouched] = useState(false);
  const [isPropertySaved, setIsPropertySaved] = useState(false);
  const statsDataPromise = useContext(PropertySearchStatsDataPromiseForCurrentQueryContext);
  const { t } = useTranslation();
  const propertyId = propertySerpObfuscatedGetId(property);
  const savedProperties = useContext(SavedPropertyContext);
  const contactedProperty = useContext(ContactedPropertyContext);
  const contactDate = contactedProperty.data.find(
    (property) => property.propertyId === parseInt(propertyId, 10)
  )?.contactDate;

  const callingAgentModalOpenRef = useRef<() => void>(functionNoop);
  const emailAgentModalOpenRef = useRef<() => void>(functionNoop);
  const menuModalOpenRef = useRef<() => void>(functionNoop);
  const socialShareOpenRef = useRef<() => void>(functionNoop);
  const propertyReportOpenRef = useRef<() => void>(functionNoop);

  const imagesResponse = useApiPropertyImages(propertyId, 'small', galleryHasBeenTouched);

  const galleryProps = {
    items: imagesResponse.ok
      ? imagesResponse.data.map((sourceUrl) => ({ sourceUrl }))
      : [
          { sourceUrl: propertySerpObfuscatedGetImgUrlSmall(property) },
          ...arrayFromRange(0, propertySerpObfuscatedGetImagesCount(property) - 1).map(() => ({
            sourceUrl: '',
          })),
        ],
    isRtl: locale === LanguageCodeEnum.ar,
    onTouch: (): void => setGalleryHasBeenTouched(true),
  };

  const sendLead = (medium: LeadMediumType): void => {
    statsDataPromise.then((result) => {
      if (result.ok) {
        StatsService().propertyLeadClick(parseInt(propertyId), { lead: { medium, cta: 'button' } });
      } else {
        // eslint-disable-next-line no-console
        console.error('Unable to send lead because stats data failed to load');
      }
    });
  };

  const ctaButtonsProps = {
    onCallClick: (): void => {
      sendLead('phone');
      callingAgentModalOpenRef.current();
      contactedProperty.add(parseInt(propertyId, 10), ContactedPropertyTypeEnum.call);
    },
    onWhatsappClick: (): void => {
      sendLead('whatsapp');
      contactedProperty.add(parseInt(propertyId, 10), ContactedPropertyTypeEnum.whatsApp);
    },
    onEmailClick: (): void => {
      sendLead('email');
      emailAgentModalOpenRef.current();
      contactedProperty.add(parseInt(propertyId, 10), ContactedPropertyTypeEnum.email);
    },
    loading,
    t,
  };

  const cardTemplateProps: PropertyCardTemplatePropsType = {
    property,
    loading,
    gallery: galleryProps,
    ctaButtons: ctaButtonsProps,
    saved: isPropertySaved,
    contactDate,
    onSaveButtonClick: (): void => {
      onSaveButtonClick(
        propertyId,
        !savedProperties.data.find((property) => property.propertyId === parseInt(propertyId, 10))
      );
      savedProperties.toggle(propertyId);
    },
    onMenuButtonClick: (): void => {
      menuModalOpenRef.current();
    },
    t,
  };

  useEffect(() => {
    setIsPropertySaved(!!savedProperties.data.find((property) => property.propertyId === parseInt(propertyId, 10)));
  }, [savedProperties.data, propertyId]);

  usePropertyCardTrackVisibilityOnScreen(statsDataPromise, propertyId, containerRef);

  return (
    <div data-testid='list-item' ref={containerRef}>
      <PropertyCardTemplate {...cardTemplateProps} />
      <EmailAgentModalComponent openRef={emailAgentModalOpenRef} property={property} />
      <CallingAgentModalComponent
        propertyId={propertyId}
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
        <PropertyReportComponent
          propertyId={propertySerpObfuscatedGetId(property)}
          t={t}
          openRef={propertyReportOpenRef}
        />
      </PropertyCardMenuModalComponent>
    </div>
  );
};
