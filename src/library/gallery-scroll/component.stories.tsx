/* eslint-disable pf-rules/export-name-validation */

import { GalleryScrollComponent } from './component';
import styles from './gallery-scroll-storybook.module.scss';

export default {
  title: 'Library/Gallery',
  component: GalleryScrollComponent,
};

const images: string[] = [
  'https://www.propertyfinder.ae/property/63fabe4d96e69e7ba1791e34575568e2/260/185/MODE/2cc18b/8175926-30b0fo.webp?ctr=ae',
  'https://www.propertyfinder.ae/property/b53e8c503e38da188429fcf75dfc44f8/260/185/MODE/12b243/8046981-7c53fo.webp?ctr=ae',
  'https://www.propertyfinder.ae/property/b905ee4213b3f531eb89f5989355f737/260/185/MODE/232aa2/8046981-099cbo.webp?ctr=ae',
  'https://www.propertyfinder.ae/property/60a60f78b797a7e364fd431606301515/260/185/MODE/b914f7/8046981-dad0fo.webp?ctr=ae',
  'https://www.propertyfinder.ae/property/d569f97dba30bf3a03f2455924beb98f/260/185/MODE/2046cc/8184970-00ef6o.webp?ctr=ae',
  'https://www.propertyfinder.ae/property/f2c3e65056ab9771eafb159a444d1b95/260/185/MODE/a01a2d/8095639-b835bo.webp?ctr=ae',
  'https://www.propertyfinder.ae/property/4a9a7b8af8d4e53c6bbfb064f9ac8efa/260/185/MODE/a476bb/8134100-b6131o.webp?ctr=ae',
  'https://www.propertyfinder.ae/property/5ec72d79dcbed5961b89bf75894631ab/260/185/MODE/ad022e/8085641-73ba9o.webp?ctr=ae',
];

export const Gallery = (props: { imagesCount: number; isRtl: boolean }): JSX.Element => (
  <GalleryScrollComponent
    isRtl={props.isRtl}
    items={images.map((sourceUrl) => ({ sourceUrl }))}
    onTouch={(): null => null}
    className={styles.gallery}
  />
);

Gallery.args = {
  isRtl: false,
};
