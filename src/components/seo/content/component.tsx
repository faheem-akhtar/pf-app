import { FunctionComponent } from 'react';

import { domClassMerge } from 'helpers/dom/class-merge';

import { SeoContentComponentPropsInterface } from './component-props.interface';
import styles from './seo-content.module.scss';

export const SeoContentComponent: FunctionComponent<SeoContentComponentPropsInterface> = ({
  heading,
  content,
  image,
}) => (
  <div className={styles.container}>
    {heading && <h2 className={styles.heading}>{heading}</h2>}
    {content && (
      <div className={styles.body}>
        {image && (
          <picture
            className={domClassMerge(styles['body-picture'], {
              [styles['body-picture--right']]: !image.align || image.align === 'right',
              [styles['body-picture--left']]: image.align === 'left',
            })}
          >
            <img className={styles['body-picture-img']} src={image.url} alt={image.alt} />
          </picture>
        )}
        <div className={styles['body-html']} dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    )}
  </div>
);
