import { domClassMerge } from 'helpers/dom/class-merge';
import { propertySerpObfuscatedGetPriceText } from 'components/property/serp/obfuscated/get/price-text';
import { propertySerpObfuscatedGetUrl } from 'components/property/serp/obfuscated/get/url';

import { IconFilledHeartTemplate } from 'components/icon/filled-heart-template';
import { IconMenuTemplate } from 'components/icon/menu-template';
import { IconThinHeartTemplate } from 'components/icon/thin-heart-template';
import { PropertyCardTitleTemplatePropsInterface } from './template-props.interface';

import styles from './property-card-title.module.scss';

export const PropertyCardTitleTemplate: React.FunctionComponent<PropertyCardTitleTemplatePropsInterface> = ({
  property,
  saved,
  onSaveButtonClick,
  onMenuButtonClick,
}) => {
  return (
    <div className={styles.container}>
      <a className={styles.link} href={propertySerpObfuscatedGetUrl(property)}>
        {propertySerpObfuscatedGetPriceText(property)}
      </a>
      <div className={styles.horizontal_spacer} />
      <div className={styles.interactive_area}>
        <button type='button' onClick={onSaveButtonClick}>
          {saved ? (
            <IconFilledHeartTemplate
              clipped
              class={domClassMerge(styles.save_button_icon, styles.save_button_icon__saved)}
            />
          ) : (
            <IconThinHeartTemplate clipped class={styles.save_button_icon} />
          )}
        </button>
        <button type='button' onClick={onMenuButtonClick} className={styles.menu_button}>
          <IconMenuTemplate clipped class={styles.menu_button_icon} />
        </button>
      </div>
    </div>
  );
};
