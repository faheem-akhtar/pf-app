import { assertUnreachable } from 'helpers/assert-unreachable';

import { AnyValue } from 'types/value';
import { PropertySerpInterface } from 'components/property/serp/interface';
import { PropertySerpObfuscatedType } from 'components/property/serp/obfuscated/type';
import { propertySerpObfuscatedFieldBathroomValue } from 'components/property/serp/obfuscated/field/bathroom-value';
import { propertySerpObfuscatedFieldBedroomValue } from 'components/property/serp/obfuscated/field/bedroom-value';
import { propertySerpObfuscatedFieldContactOptionsList } from 'components/property/serp/obfuscated/field/contact-options-list';
import { propertySerpObfuscatedFieldExclusive } from 'components/property/serp/obfuscated/field/exclusive';
import { propertySerpObfuscatedFieldImgUrl } from 'components/property/serp/obfuscated/field/img-url';
import { propertySerpObfuscatedFieldListingLevel } from 'components/property/serp/obfuscated/field/listing-level';
import { propertySerpObfuscatedFieldLocationTreePath } from 'components/property/serp/obfuscated/field/location-tree-path';
import { propertySerpObfuscatedFieldName } from 'components/property/serp/obfuscated/field/name';
import { propertySerpObfuscatedFieldPriceText } from 'components/property/serp/obfuscated/field/price-text';
import { propertySerpObfuscatedFieldPropertyTypeName } from 'components/property/serp/obfuscated/field/property-type-name';
import { propertySerpObfuscatedFieldUrl } from 'components/property/serp/obfuscated/field/url';
import { propertySerpObfuscatedFieldVerified } from 'components/property/serp/obfuscated/field/verified';

export const backendPropertySerpObfuscate = (property: PropertySerpInterface): PropertySerpObfuscatedType => {
  const obfuscatedProperty: Record<string, AnyValue> = {};

  Object.keys(property).forEach((key) => {
    const propertyKey = key as keyof PropertySerpInterface;
    const value = property[propertyKey];
    switch (propertyKey) {
      case 'url':
        obfuscatedProperty[propertySerpObfuscatedFieldUrl] = value;
        break;
      case 'name':
        obfuscatedProperty[propertySerpObfuscatedFieldName] = value;
        break;
      case 'verified':
        obfuscatedProperty[propertySerpObfuscatedFieldVerified] = value;
        break;
      case 'listingLevel':
        obfuscatedProperty[propertySerpObfuscatedFieldListingLevel] = value;
        break;
      case 'bathroomValue':
        obfuscatedProperty[propertySerpObfuscatedFieldBathroomValue] = value;
        break;
      case 'bedroomValue':
        obfuscatedProperty[propertySerpObfuscatedFieldBedroomValue] = value;
        break;
      case 'locationTreePath':
        obfuscatedProperty[propertySerpObfuscatedFieldLocationTreePath] = value;
        break;
      case 'exclusive':
        obfuscatedProperty[propertySerpObfuscatedFieldExclusive] = value;
        break;
      case 'imgUrl':
        obfuscatedProperty[propertySerpObfuscatedFieldImgUrl] = value;
        break;
      case 'propertyTypeName':
        obfuscatedProperty[propertySerpObfuscatedFieldPropertyTypeName] = value;
        break;
      case 'contactOptionsList':
        obfuscatedProperty[propertySerpObfuscatedFieldContactOptionsList] = value;
        break;
      case 'priceText':
        obfuscatedProperty[propertySerpObfuscatedFieldPriceText] = value;
        break;
      default:
        assertUnreachable(propertyKey);
    }
  });

  return obfuscatedProperty as PropertySerpObfuscatedType;
};
