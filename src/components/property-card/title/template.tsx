import { IconSolidFavoriteTemplate } from 'components/icon/solid/favorite-template';
import { IconThinFavoriteTemplate } from 'components/icon/thin/favorite-template';
import { IconThinMenuTemplate } from 'components/icon/thin/menu-template';
import { propertySerpObfuscatedGetPriceText } from 'components/property/serp/obfuscated/get/price-text';
import { propertySerpObfuscatedGetUrl } from 'components/property/serp/obfuscated/get/url';
import { domClassMerge } from 'helpers/dom/class-merge';

import styles from './property-card-title.module.scss';
import { PropertyCardTitleTemplatePropsInterface } from './template-props.interface';

export const PropertyCardTitleTemplate: React.FunctionComponent<PropertyCardTitleTemplatePropsInterface> = ({
  property,
  saved,
  onSaveButtonClick,
  onMenuButtonClick,
}) => {
  return (
    <div className={styles.container}>
      <a className={styles.link} href={`${propertySerpObfuscatedGetUrl(property)}?ref=listing`}>
        {propertySerpObfuscatedGetPriceText(property)}
      </a>
      <div className={styles.horizontal_spacer} />
      <div className={styles.interactive_area}>
        <button type='button' onClick={onSaveButtonClick}>
          {saved ? (
            <IconSolidFavoriteTemplate
              clipped
              class={domClassMerge(styles.save_button_icon, styles.save_button_icon__saved)}
            />
          ) : (
            <IconThinFavoriteTemplate clipped class={styles.save_button_icon} />
          )}
        </button>
        <button type='button' onClick={onMenuButtonClick} className={styles.menu_button}>
          <IconThinMenuTemplate clipped class={styles.menu_button_icon} />
        </button>
      </div>
    </div>
  );
};
