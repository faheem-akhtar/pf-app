import { propertySerpObfuscatedGetContactOptionsList } from 'components/property/serp/obfuscated/get/contact-options-list';
import { propertySerpObfuscatedGetLocationTreePath } from 'components/property/serp/obfuscated/get/location-tree-path';
import { propertySerpObfuscatedGetName } from 'components/property/serp/obfuscated/get/name';
import { GalleryScrollComponent } from 'library/gallery-scroll/component';

import { PropertyCardCtaButtonsGroupTemplate } from './cta-buttons-group/template';
import { PropertyCardInfoTemplate } from './info/template';
import { PropertyCardLoadingSkeletonTemplate } from './loading-skeleton/template';
import styles from './property-card.module.scss';
import { PropertyCardTemplatePropsType } from './template-props.type';
import { PropertyCardTitleTemplate } from './title/template';

export const PropertyCardTemplate = (props: PropertyCardTemplatePropsType): JSX.Element => {
  const { loading } = props;

  if (loading) {
    return <PropertyCardLoadingSkeletonTemplate />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.gallery_container}>
        <GalleryScrollComponent {...props.gallery} />
      </div>
      <div className={styles.content_container}>
        <PropertyCardTitleTemplate {...props} />
        <h2 className={styles.title_from_agent}>{propertySerpObfuscatedGetName(props.property)}</h2>
        <div className={styles.location}>{propertySerpObfuscatedGetLocationTreePath(props.property)}</div>
        <PropertyCardInfoTemplate property={props.property} t={props.t} />
        <div className={styles.fill_vertical_space} />
        <PropertyCardCtaButtonsGroupTemplate
          {...props.ctaButtons}
          contactOptions={propertySerpObfuscatedGetContactOptionsList(props.property)}
        />
      </div>
    </div>
  );
};
