import { useRouter } from 'next/router';
import { useContext, useRef, useState } from 'react';

import { useApiPropertyImages } from 'api/property-images/hook';
import { CallingAgentModalComponent } from 'components/calling-agent-modal/component';
import { ContactedPropertyContext } from 'components/contacted-property/context';
import { EmailAgentModalComponent } from 'components/email-agent-modal/component';
import { PropertyReportComponent } from 'components/property/report/component';
import { propertySerpObfuscatedGetId } from 'components/property/serp/obfuscated/get/id';
import { propertySerpObfuscatedGetImagesCount } from 'components/property/serp/obfuscated/get/images-count';
import { propertySerpObfuscatedGetImgUrlSmall } from 'components/property/serp/obfuscated/get/img-url-small';
import { propertySerpObfuscatedGetReference } from 'components/property/serp/obfuscated/get/reference';
import { SavePropertyContext } from 'components/save-property/context';
import { ContactedPropertyTypeEnum } from 'enums/contacted-property/type.enum';
import { LanguageCodeEnum } from 'enums/language/code.enum';
import { arrayFromRange } from 'helpers/array/from-range';
import { functionNoop } from 'helpers/function/noop';
import { useTranslation } from 'helpers/translation/hook';

import { PropertyShareComponent } from '../property/share/component';
import { PropertyCardComponentPropsType } from './component-props.type';
import { PropertyCardMenuContentTemplate } from './menu/content/template';
import { PropertyCardMenuModalComponent } from './menu/modal/component';
import { PropertyCardTemplate } from './template';
import { PropertyCardTemplatePropsType } from './template-props.type';

export const PropertyCardComponent = ({ property, loading }: PropertyCardComponentPropsType): JSX.Element => {
  const { locale } = useRouter();
  const [galleryHasBeenTouched, setGalleryHasBeenTouched] = useState(false);
  const { t } = useTranslation();
  const propertyId = propertySerpObfuscatedGetId(property);
  const saveProperty = useContext(SavePropertyContext);
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

  const ctaButtonsProps = {
    onCallClick: (): void => {
      callingAgentModalOpenRef.current();
      contactedProperty.add(parseInt(propertyId, 10), ContactedPropertyTypeEnum.call);
    },
    onWhatsappClick: (): void => {
      contactedProperty.add(parseInt(propertyId, 10), ContactedPropertyTypeEnum.whatsApp);
    },
    onEmailClick: (): void => {
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
    saved: saveProperty.propertyIds.includes(parseInt(propertyId, 10)),
    contactDate,
    onSaveButtonClick: (): void => saveProperty.toggle(propertyId),
    onMenuButtonClick: (): void => {
      menuModalOpenRef.current();
    },
    t,
  };

  return (
    <div data-testid='list-item'>
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
