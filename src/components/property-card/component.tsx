import { domClassMerge } from 'helpers/dom/class-merge';
import { propertySerpObfuscatedGetContactOptionsList } from 'components/property/serp/obfuscated/get/contact-options-list';
import { propertySerpObfuscatedGetName } from 'components/property/serp/obfuscated/get/name';
import { propertySerpObfuscatedGetPriceText } from 'components/property/serp/obfuscated/get/price-text';
import { propertySerpObfuscatedGetUrl } from 'components/property/serp/obfuscated/get/url';

import { PropertyCardComponentPropsType } from './component-props.type';

import styles from './property-card.module.scss';

export const PropertyCardComponent = ({ property, loading }: PropertyCardComponentPropsType): JSX.Element => {
  return (
    <div className={domClassMerge(styles.container, { [styles.loading]: loading })}>
      <a href={propertySerpObfuscatedGetUrl(property)} target='__blank'>
        <p>{propertySerpObfuscatedGetName(property)}</p>
      </a>
      <p>{propertySerpObfuscatedGetPriceText(property)}</p>
      <p>{propertySerpObfuscatedGetContactOptionsList(property).phone.value}</p>
    </div>
  );
};
