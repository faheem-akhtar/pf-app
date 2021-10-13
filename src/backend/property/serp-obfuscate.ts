import { PropertySerpInterface } from 'components/property/serp/interface';
import { propertySerpObfuscatedFieldAgentId } from 'components/property/serp/obfuscated/field/agent-id';
import { propertySerpObfuscatedFieldAreaValue } from 'components/property/serp/obfuscated/field/area-value';
import { propertySerpObfuscatedFieldBathroomValue } from 'components/property/serp/obfuscated/field/bathroom-value';
import { propertySerpObfuscatedFieldBedroomValue } from 'components/property/serp/obfuscated/field/bedroom-value';
import { propertySerpObfuscatedFieldBrokerId } from 'components/property/serp/obfuscated/field/broker-id';
import { propertySerpObfuscatedFieldCompletionStatus } from 'components/property/serp/obfuscated/field/completion-status';
import { propertySerpObfuscatedFieldContactOptionsList } from 'components/property/serp/obfuscated/field/contact-options-list';
import { propertySerpObfuscatedFieldDateInsert } from 'components/property/serp/obfuscated/field/date-insert';
import { propertySerpObfuscatedFieldDefaultPrice } from 'components/property/serp/obfuscated/field/default-price';
import { propertySerpObfuscatedFieldExclusive } from 'components/property/serp/obfuscated/field/exclusive';
import { propertySerpObfuscatedFieldId } from 'components/property/serp/obfuscated/field/id';
import { propertySerpObfuscatedFieldImagesCount } from 'components/property/serp/obfuscated/field/images-count';
import { propertySerpObfuscatedFieldImgUrl } from 'components/property/serp/obfuscated/field/img-url';
import { propertySerpObfuscatedFieldImgUrlSmall } from 'components/property/serp/obfuscated/field/img-url-small';
import { propertySerpObfuscatedFieldListingLevel } from 'components/property/serp/obfuscated/field/listing-level';
import { propertySerpObfuscatedFieldLiveEventValue } from 'components/property/serp/obfuscated/field/live-event-value';
import { propertySerpObfuscatedFieldLocationTreeCompact } from 'components/property/serp/obfuscated/field/location-tree-compact';
import { propertySerpObfuscatedFieldLocationTreePath } from 'components/property/serp/obfuscated/field/location-tree-path';
import { propertySerpObfuscatedFieldName } from 'components/property/serp/obfuscated/field/name';
import { propertySerpObfuscatedFieldPriceText } from 'components/property/serp/obfuscated/field/price-text';
import { propertySerpObfuscatedFieldPropertyTypeName } from 'components/property/serp/obfuscated/field/property-type-name';
import { propertySerpObfuscatedFieldPublishDateValue } from 'components/property/serp/obfuscated/field/publish-date-value';
import { propertySerpObfuscatedFieldQualityScore } from 'components/property/serp/obfuscated/field/quality-score';
import { propertySerpObfuscatedFieldReference } from 'components/property/serp/obfuscated/field/reference';
import { propertySerpObfuscatedFieldSize } from 'components/property/serp/obfuscated/field/size';
import { propertySerpObfuscatedFieldUrl } from 'components/property/serp/obfuscated/field/url';
import { propertySerpObfuscatedFieldVerified } from 'components/property/serp/obfuscated/field/verified';
import { PropertySerpObfuscatedType } from 'components/property/serp/obfuscated/type';
import { configIsTrace } from 'config/is-trace';
import { assertUnreachable } from 'helpers/assert/unreachable';
import { AnyValueType } from 'types/any/value.type';

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
      case 'area':
        obfuscatedProperty[propertySerpObfuscatedFieldAreaValue] = value;
        break;
      case 'publishDate':
        obfuscatedProperty[propertySerpObfuscatedFieldPublishDateValue] = value;
        break;
      case 'liveEvent':
        obfuscatedProperty[propertySerpObfuscatedFieldLiveEventValue] = value;
        break;
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
      //TODO-FE[CX-373] Remove imgUrlSmall
      case 'imgUrlSmall':
        obfuscatedProperty[propertySerpObfuscatedFieldImgUrlSmall] = value;
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
      case 'defaultPrice':
        obfuscatedProperty[propertySerpObfuscatedFieldDefaultPrice] = value;
        break;
      case 'agentId':
        obfuscatedProperty[propertySerpObfuscatedFieldAgentId] = value;
        break;
      case 'brokerId':
        obfuscatedProperty[propertySerpObfuscatedFieldBrokerId] = value;
        break;
      case 'locationTreeCompact':
        obfuscatedProperty[propertySerpObfuscatedFieldLocationTreeCompact] = value;
        break;
      case 'size':
        obfuscatedProperty[propertySerpObfuscatedFieldSize] = value;
        break;
      case 'qualityScore':
        obfuscatedProperty[propertySerpObfuscatedFieldQualityScore] = value;
        break;
      case 'dateInsert':
        obfuscatedProperty[propertySerpObfuscatedFieldDateInsert] = value;
        break;
      case 'completionStatus':
        obfuscatedProperty[propertySerpObfuscatedFieldCompletionStatus] = value;
        break;
      default:
        assertUnreachable(propertyKey);
    }
  });

  return obfuscatedProperty as PropertySerpObfuscatedType;
};
