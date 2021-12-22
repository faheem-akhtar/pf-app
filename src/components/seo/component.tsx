import { FunctionComponent } from 'react';

import { SeoComponentPropsInterface } from './component-props.interface';
import { SeoContentComponent } from './content/component';
import { SeoLinksComponent } from './links/component';
import styles from './seo.module.scss';

export const SeoComponent: FunctionComponent<SeoComponentPropsInterface> = ({
  popularSearches,
  nearbyAreas,
  alternateCategory,
  content,
}) => (
  <section id='cms-content'>
    {(content?.primaryContent || content?.secondaryContent) && <hr className={styles.hr} />}
    {content?.primaryContent && (
      <SeoContentComponent
        heading={content.primaryHeading}
        content={content.primaryContent}
        image={
          content.primaryImageUrl
            ? {
                url: content.primaryImageUrl,
                alt: content.primaryImageAlt,
              }
            : undefined
        }
      />
    )}
    {content?.secondaryContent && (
      <SeoContentComponent
        heading={content.secondaryHeading}
        content={content.secondaryContent}
        image={
          content.secondaryImageUrl
            ? {
                url: content.secondaryImageUrl,
                alt: content.secondaryImageAlt,
                align: 'left',
              }
            : undefined
        }
      />
    )}
    <SeoLinksComponent
      popularSearches={popularSearches}
      nearbyAreas={nearbyAreas}
      alternateCategory={alternateCategory}
    />
  </section>
);
