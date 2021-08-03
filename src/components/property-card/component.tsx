import { arrayFromRange } from 'helpers/array/from-range';
import { domClassMerge } from 'helpers/dom/class-merge';
import { propertySerpObfuscatedGetContactOptionsList } from 'components/property/serp/obfuscated/get/contact-options-list';
import { propertySerpObfuscatedGetId } from 'components/property/serp/obfuscated/get/id';
import { propertySerpObfuscatedGetImagesCount } from 'components/property/serp/obfuscated/get/images-count';
import { propertySerpObfuscatedGetImgUrl } from 'components/property/serp/obfuscated/get/img-url';
import { propertySerpObfuscatedGetName } from 'components/property/serp/obfuscated/get/name';
import { propertySerpObfuscatedGetPriceText } from 'components/property/serp/obfuscated/get/price-text';
import { propertySerpObfuscatedGetUrl } from 'components/property/serp/obfuscated/get/url';
import { useRouter } from 'next/router';

import { GalleryScrollComponent } from 'library/gallery-scroll/component';
import { LanguageCodeEnum } from 'enums/language/code.enum';
import { PropertyCardComponentPropsType } from './component-props.type';

import styles from './property-card.module.scss';
import { useApiPropertyImages } from 'api/property-images/hook';
import { useState } from 'react';

export const PropertyCardComponent = ({ property, loading }: PropertyCardComponentPropsType): JSX.Element => {
  const { locale } = useRouter();
  const [galleryHasBeenTouched, setGalleryHasBeenTouched] = useState(false);

  const imagesResponse = useApiPropertyImages(propertySerpObfuscatedGetId(property), 'small', galleryHasBeenTouched);

  return (
    <div className={domClassMerge(styles.container, { [styles.loading]: loading })}>
      <div className={domClassMerge(styles.gallery_container, { [styles.loading]: loading })}>
        {!loading && (
          <GalleryScrollComponent
            items={
              imagesResponse.ok
                ? imagesResponse.data.map((sourceUrl) => ({ sourceUrl }))
                : [
                    { sourceUrl: propertySerpObfuscatedGetImgUrl(property) },
                    ...arrayFromRange(0, propertySerpObfuscatedGetImagesCount(property) - 1).map(() => ({
                      sourceUrl: '',
                    })),
                  ]
            }
            isRtl={locale === LanguageCodeEnum.ar}
            onTouch={(): void => setGalleryHasBeenTouched(true)}
          />
        )}
      </div>
      <div className={styles.content_container}>
        <a href={propertySerpObfuscatedGetUrl(property)} target='__blank'>
          <p>{propertySerpObfuscatedGetName(property)}</p>
        </a>
        <p>{propertySerpObfuscatedGetPriceText(property)}</p>
        <p>{propertySerpObfuscatedGetContactOptionsList(property).phone.value}</p>
      </div>
    </div>
  );
};
