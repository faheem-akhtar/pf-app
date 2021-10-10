import { propertySerpObfuscatedGetBathroomValue } from 'components/property/serp/obfuscated/get/bathroom-value';
import { propertySerpObfuscatedGetBedroomValue } from 'components/property/serp/obfuscated/get/bedroom-value';
import { propertySerpObfuscatedGetPropertyTypeName } from 'components/property/serp/obfuscated/get/property-type-name';

import styles from './property-card-info.module.scss';
import { PropertyCardInfoTemplatePropsInterface } from './template-props.interface';

export const PropertyCardInfoTemplate: React.FunctionComponent<PropertyCardInfoTemplatePropsInterface> = (props) => {
  const propertyType = propertySerpObfuscatedGetPropertyTypeName(props.property);
  const bedsValue = propertySerpObfuscatedGetBedroomValue(props.property);
  const bathsValue = propertySerpObfuscatedGetBathroomValue(props.property);

  return (
    <div className={styles.container}>
      {[
        propertyType,
        props.t('n-bedroom', { count: bedsValue }, bedsValue > 7),
        props.t('n-bathroom', { count: bathsValue }, bathsValue > 7),
      ].join(', ')}
    </div>
  );
};
