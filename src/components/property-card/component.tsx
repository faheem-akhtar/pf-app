import { useRef, useState } from 'react';
import { useRouter } from 'next/router';

import { arrayFromRange } from 'helpers/array/from-range';
import { functionNoop } from 'helpers/function/noop';
import { propertySerpObfuscatedGetId } from 'components/property/serp/obfuscated/get/id';
import { propertySerpObfuscatedGetImagesCount } from 'components/property/serp/obfuscated/get/images-count';
import { propertySerpObfuscatedGetImgUrl } from 'components/property/serp/obfuscated/get/img-url';
import { useApiPropertyImages } from 'api/property-images/hook';
import { useTranslation } from 'helpers/translation/hook';

import { CallingAgentModalComponent } from 'components/calling-agent-modal/component';
import { EmailAgentModalComponent } from 'components/email-agent-modal/component';
import { LanguageCodeEnum } from 'enums/language/code.enum';
import { PropertyCardComponentPropsType } from './component-props.type';
import { PropertyCardMenuContentTemplate } from './menu/content/template';
import { PropertyCardMenuModalComponent } from './menu/modal/component';
import { PropertyCardTemplate } from './template';
import { PropertyCardTemplatePropsType } from './template-props.type';
import { propertySerpObfuscatedGetReference } from 'components/property/serp/obfuscated/get/reference';

export const PropertyCardComponent = ({ property, loading }: PropertyCardComponentPropsType): JSX.Element => {
  const { locale } = useRouter();
  const [galleryHasBeenTouched, setGalleryHasBeenTouched] = useState(false);
  const { t } = useTranslation();

  const callingAgentModalOpenRef = useRef<() => void>(functionNoop);
  const emailAgentModalOpenRef = useRef<() => void>(functionNoop);
  const menuModalOpenRef = useRef<() => void>(functionNoop);

  const imagesResponse = useApiPropertyImages(propertySerpObfuscatedGetId(property), 'small', galleryHasBeenTouched);

  const galleryProps = {
    items: imagesResponse.ok
      ? imagesResponse.data.map((sourceUrl) => ({ sourceUrl }))
      : [
          { sourceUrl: propertySerpObfuscatedGetImgUrl(property) },
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

  /** TODO-FE[TPNX-3092] remove this and use actual data about saved properties */
  const [saved, setSaved] = useState(false);

  const cardTemplateProps: PropertyCardTemplatePropsType = {
    property,
    loading,
    gallery: galleryProps,
    ctaButtons: ctaButtonsProps,
    saved,
    onSaveButtonClick: () => setSaved(!saved),
    onMenuButtonClick: (): void => {
      menuModalOpenRef.current();
    },
    t,
  };

  return (
    <div>
      <PropertyCardTemplate {...cardTemplateProps} />
      <EmailAgentModalComponent openRef={emailAgentModalOpenRef} />
      <CallingAgentModalComponent
        propertyId={propertySerpObfuscatedGetId(property)}
        referenceId={propertySerpObfuscatedGetReference(property)}
        openRef={callingAgentModalOpenRef}
      />
      <PropertyCardMenuModalComponent closeButtonLabel={t('cta-cancel')} openRef={menuModalOpenRef}>
        <PropertyCardMenuContentTemplate t={t} />
      </PropertyCardMenuModalComponent>
    </div>
  );
};
