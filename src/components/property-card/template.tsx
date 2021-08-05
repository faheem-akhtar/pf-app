import { domClassMerge } from 'helpers/dom/class-merge';
import { propertySerpObfuscatedGetContactOptionsList } from 'components/property/serp/obfuscated/get/contact-options-list';

import { GalleryScrollComponent } from 'library/gallery-scroll/component';
import { PropertyCardCtaButtonsGroupTemplate } from './cta-buttons-group/template';
import { PropertyCardTemplatePropsType } from './template-props.type';
import { PropertyCardTitleTemplate } from './title/template';

import styles from './property-card.module.scss';

export const PropertyCardTemplate = (props: PropertyCardTemplatePropsType): JSX.Element => {
  const contactOptions = propertySerpObfuscatedGetContactOptionsList(props.property);

  return (
    <div className={styles.container}>
      <div className={domClassMerge(styles.gallery_container, { loading: props.loading })}>
        {!props.loading && <GalleryScrollComponent {...props.gallery} />}
      </div>
      <div className={styles.content_container}>
        <PropertyCardTitleTemplate {...props} />
        <div className={styles.fill_vertical_space} />
        <PropertyCardCtaButtonsGroupTemplate
          {...props.ctaButtons}
          contactOptions={contactOptions}
          loading={props.loading}
        />
      </div>
    </div>
  );
};
