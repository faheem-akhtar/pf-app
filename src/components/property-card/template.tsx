import { FunctionComponent } from 'react';

import { domClassMerge } from 'helpers/dom/class-merge';
import { GalleryScrollComponent } from 'library/gallery-scroll/component';
import { GalleryScrollObjectFitEnum } from 'library/gallery-scroll/object-fit.enum';

import { PropertyCardBannersTemplate } from './banners/template';
import { PropertyCardGalleryPlaceholderTemplate } from './gallery-placeholder/template';
import { PropertyCardLoadingSkeletonTemplate } from './loading-skeleton/template';
import { PropertyCardMenuTemplate } from './menu/template';
import styles from './property-card.module.scss';
import { PropertyCardTemplatePropsType } from './template-props.type';
import { PropertyCardVariantsClassicTemplate } from './variants/classic/template';
import { propertyCardVariantsModernIsActive } from './variants/modern/is-active';
import { PropertyCardVariantsModernTemplate } from './variants/modern/template';
import { PropertyCardVariantsTemplatePropsBaseInterface } from './variants/template-props-base.interface';

// TODO-FE [CX-598] Maintain props for propertyModel/tealium
export const PropertyCardTemplate: FunctionComponent<PropertyCardTemplatePropsType> = ({
  loading,
  gallery,
  banners,
  showBanners = true,
  saved,
  cardType,

  onGalleryClick,
  onGalleryIndexChange,
  onSaveButtonClick,
  onMenuButtonClick,
  ...rest
}) => {
  if (loading) {
    return <PropertyCardLoadingSkeletonTemplate cardType={cardType} />;
  }

  const templateProps: PropertyCardVariantsTemplatePropsBaseInterface = {
    ...rest,
    cardType,
    templates: {
      gallery: gallery.items.length ? (
        <GalleryScrollComponent
          {...gallery}
          className={styles.gallery}
          objectFit={
            propertyCardVariantsModernIsActive(cardType)
              ? GalleryScrollObjectFitEnum.UNSET
              : GalleryScrollObjectFitEnum.NONE
          }
          onActiveIndexChange={onGalleryIndexChange}
          onClick={onGalleryClick}
        />
      ) : (
        <button className={styles.placeholder} onClick={onGalleryClick}>
          <PropertyCardGalleryPlaceholderTemplate />
        </button>
      ),
      banners: <PropertyCardBannersTemplate banners={banners} showBanners={showBanners} />,
      menu: (
        <PropertyCardMenuTemplate
          saved={saved}
          onSaveButtonClick={onSaveButtonClick}
          onMenuButtonClick={onMenuButtonClick}
          cardType={cardType}
        />
      ),
    },
  };

  return (
    <article className={domClassMerge(styles.container, { [styles[`container--${cardType}`]]: !!cardType })}>
      {propertyCardVariantsModernIsActive(cardType) ? (
        <PropertyCardVariantsModernTemplate {...templateProps} />
      ) : (
        <PropertyCardVariantsClassicTemplate {...templateProps} />
      )}
    </article>
  );
};
