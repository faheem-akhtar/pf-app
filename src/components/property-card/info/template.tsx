import { useTranslation } from 'next-i18next';

import { componentsPropertyCardGetBathroomsString } from '../get-bathrooms-string';
import { propertyCardGetBedroomsString } from '../get-bedrooms-string';
import { propertySerpObfuscatedGetBathroomValue } from 'components/property/serp/obfuscated/get/bathroom-value';
import { propertySerpObfuscatedGetBedroomValue } from 'components/property/serp/obfuscated/get/bedroom-value';
import { propertySerpObfuscatedGetPropertyTypeName } from 'components/property/serp/obfuscated/get/property-type-name';

import { PropertyCardInfoTemplatePropsInterface } from './template-props.interface';

import styles from './property-card-info.module.scss';

export const PropertyCardInfoTemplate: React.FunctionComponent<PropertyCardInfoTemplatePropsInterface> = (props) => {
  const { t } = useTranslation();
  const propertyType = propertySerpObfuscatedGetPropertyTypeName(props.property);
  const bedsValue = propertySerpObfuscatedGetBedroomValue(props.property);
  const bathsValue = propertySerpObfuscatedGetBathroomValue(props.property);

  return (
    <div className={styles.container}>
      {propertyType}
      {propertyCardGetBedroomsString(t, bedsValue)}
      {componentsPropertyCardGetBathroomsString(t, bathsValue)}
    </div>
  );
};
