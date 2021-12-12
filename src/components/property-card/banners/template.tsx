import { FunctionComponent } from 'react';

import { domClassMerge } from 'helpers/dom/class-merge';

import styles from '../property-card.module.scss';
import { PropertyCardBannersTemplatePropsInterface } from './template-props.interface';

export const PropertyCardBannersTemplate: FunctionComponent<PropertyCardBannersTemplatePropsInterface> = ({
  banners = [],
  showBanners = true,
}): JSX.Element | null => {
  if (!banners.length) {
    return null;
  }

  return (
    <ul
      className={domClassMerge(styles['banner-list'], {
        [styles['banner-list--hidden']]: !showBanners,
      })}
    >
      {banners.map(({ text, colorClass }, index) => (
        <li key={index} className={domClassMerge(styles.banner, styles[colorClass])}>
          {text}
        </li>
      ))}
    </ul>
  );
};
