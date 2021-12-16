import { useState } from 'react';

import { IconLogoBrandmarkTemplate } from 'components/icon/logo/brandmark-template';

import styles from './gallery-scroll.module.scss';
import { GalleryScrollObjectFitEnum } from './object-fit.enum';
import { GalleryScrollPictureComponentPropsInterface } from './picture-component-props.interface';

export const GalleryScrollPictureComponent = ({
  style,
  sourceUrl,
  isTouched,
  objectFit = GalleryScrollObjectFitEnum.NONE,
}: GalleryScrollPictureComponentPropsInterface): JSX.Element => {
  const [loading, setLoading] = useState(true);

  return (
    <picture
      data-testid='gallery-scroll-picture'
      style={style || {}}
      className={styles.item}
      onLoad={(): void => setLoading(false)}
    >
      {sourceUrl && <source srcSet={sourceUrl.replace('.jpg', '.webp')} type='image/webp' />}
      {sourceUrl && <source srcSet={sourceUrl} type='image/jpeg' />}
      {sourceUrl && <img style={{ objectFit }} loading={isTouched ? undefined : 'lazy'} src={sourceUrl} />}
      {loading && <IconLogoBrandmarkTemplate class={styles['loading-icon']} />}
    </picture>
  );
};
