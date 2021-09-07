import { useContext, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import { arrayFromRange } from 'helpers/array/from-range';
import { CallingAgentModalComponent } from 'components/calling-agent-modal/component';
import { EmailAgentModalComponent } from 'components/email-agent-modal/component';
import { functionNoop } from 'helpers/function/noop';
import { LanguageCodeEnum } from 'enums/language/code.enum';
import { PropertyCardComponentPropsType } from './component-props.type';
import { PropertyCardMenuContentTemplate } from './menu/content/template';
import { PropertyCardMenuModalComponent } from './menu/modal/component';
import { PropertyCardTemplate } from './template';
import { PropertyCardTemplatePropsType } from './template-props.type';
import { PropertyReportComponent } from 'components/property/report/component';
import { propertySerpObfuscatedGetId } from 'components/property/serp/obfuscated/get/id';
import { propertySerpObfuscatedGetImagesCount } from 'components/property/serp/obfuscated/get/images-count';
import { propertySerpObfuscatedGetImgUrlSmall } from 'components/property/serp/obfuscated/get/img-url-small';
import { propertySerpObfuscatedGetReference } from 'components/property/serp/obfuscated/get/reference';
import { PropertyShareComponent } from '../property/share/component';
import { SavePropertyContext } from 'components/save-property/context';
import { useApiPropertyImages } from 'api/property-images/hook';
import { useTranslation } from 'helpers/translation/hook';

export const PropertyCardComponent = ({ property, loading }: PropertyCardComponentPropsType): JSX.Element => {
  const { locale } = useRouter();
  const [galleryHasBeenTouched, setGalleryHasBeenTouched] = useState(false);
  const { t } = useTranslation();
  const propertyId = propertySerpObfuscatedGetId(property);
  const saveProperty = useContext(SavePropertyContext);

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
    },
    onWhatsappClick: (): void => undefined,
    onEmailClick: (): void => {
      emailAgentModalOpenRef.current();
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
