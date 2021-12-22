import { FunctionComponent } from 'react';

import { AccordionComponent } from 'library/accordion/component';
import { AccordionItemComponent } from 'library/accordion/item/component';

import styles from '../seo.module.scss';
import { SeoLinksComponentPropsInterface } from './component-props.interface';

export const SeoLinksComponent: FunctionComponent<SeoLinksComponentPropsInterface> = ({
  popularSearches,
  nearbyAreas,
  alternateCategory,
}) => (
  <AccordionComponent>
    {popularSearches && (
      <AccordionItemComponent title={popularSearches.title} expanded>
        {popularSearches.links.map((link) => (
          <a key={link.path} href={link.path} className={styles.link}>
            {link.title}
          </a>
        ))}
        {alternateCategory?.links.map((link) => (
          <a key={link.path} href={link.path} className={styles.link}>
            {link.title}
          </a>
        ))}
      </AccordionItemComponent>
    )}

    {nearbyAreas && (
      <AccordionItemComponent title={nearbyAreas.title}>
        {nearbyAreas.links.map((link) => (
          <a key={link.path} href={link.path} className={styles.link}>
            {link.title}
          </a>
        ))}
      </AccordionItemComponent>
    )}
  </AccordionComponent>
);
