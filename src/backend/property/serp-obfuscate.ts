import { assertUnreachable } from 'helpers/assert/unreachable';
import { configIsTrace } from 'config/is-trace';
import { propertySerpObfuscatedFieldBathroomValue } from 'components/property/serp/obfuscated/field/bathroom-value';
import { propertySerpObfuscatedFieldBedroomValue } from 'components/property/serp/obfuscated/field/bedroom-value';
import { propertySerpObfuscatedFieldContactOptionsList } from 'components/property/serp/obfuscated/field/contact-options-list';
import { propertySerpObfuscatedFieldExclusive } from 'components/property/serp/obfuscated/field/exclusive';
import { propertySerpObfuscatedFieldId } from 'components/property/serp/obfuscated/field/id';
import { propertySerpObfuscatedFieldImagesCount } from 'components/property/serp/obfuscated/field/images-count';
import { propertySerpObfuscatedFieldImgUrl } from 'components/property/serp/obfuscated/field/img-url';
import { propertySerpObfuscatedFieldListingLevel } from 'components/property/serp/obfuscated/field/listing-level';
import { propertySerpObfuscatedFieldLocationTreePath } from 'components/property/serp/obfuscated/field/location-tree-path';
import { propertySerpObfuscatedFieldName } from 'components/property/serp/obfuscated/field/name';
import { propertySerpObfuscatedFieldPriceText } from 'components/property/serp/obfuscated/field/price-text';
import { propertySerpObfuscatedFieldPropertyTypeName } from 'components/property/serp/obfuscated/field/property-type-name';
import { propertySerpObfuscatedFieldReference } from 'components/property/serp/obfuscated/field/reference';
import { propertySerpObfuscatedFieldUrl } from 'components/property/serp/obfuscated/field/url';
import { propertySerpObfuscatedFieldVerified } from 'components/property/serp/obfuscated/field/verified';

import { AnyValueType } from 'types/any/value.type';
import { PropertySerpInterface } from 'components/property/serp/interface';
import { PropertySerpObfuscatedType } from 'components/property/serp/obfuscated/type';

// TODO-FE[CX-409] add tests
export const backendPropertySerpObfuscate = (property: PropertySerpInterface): PropertySerpObfuscatedType => {
  const obfuscatedProperty: Record<string, AnyValueType> = {};

  if (configIsTrace) {
    obfuscatedProperty.__full = property;
  }

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
      case 'imagesCount':
        obfuscatedProperty[propertySerpObfuscatedFieldImagesCount] = value;
        break;
      case 'id':
        obfuscatedProperty[propertySerpObfuscatedFieldId] = value;
        break;
      case 'reference':
        obfuscatedProperty[propertySerpObfuscatedFieldReference] = value;
        break;
      default:
        assertUnreachable(propertyKey);
    }
  });

  return obfuscatedProperty as PropertySerpObfuscatedType;
};
