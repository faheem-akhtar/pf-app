import { useState } from 'react';

import { domClassMerge } from 'helpers/dom/class-merge';

import styles from './gallery-scroll.module.scss';
import { GalleryScrollPictureComponentPropsInterface } from './picture-component-props.interface';

export const GalleryScrollPictureComponent = ({
  style,
  sourceUrl,
  isTouched,
}: GalleryScrollPictureComponentPropsInterface): JSX.Element => {
  const [loading, setLoading] = useState(true);

  return (
    <picture
      data-testid='GalleryScrollPicture'
      style={style || {}}
      className={domClassMerge(styles.item, { loading })}
      onLoad={(): void => setLoading(false)}
    >
      {sourceUrl && <source srcSet={sourceUrl.replace('.jpg', '.webp')} type='image/webp' />}
      {sourceUrl && <source srcSet={sourceUrl} type='image/jpeg' />}
      {sourceUrl && <img loading={isTouched ? undefined : 'lazy'} src={sourceUrl} />}
    </picture>
  );
};
