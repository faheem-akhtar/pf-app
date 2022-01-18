import { contactOptionsEnabledStub } from 'stubs/contact-options/enabled.stub';
import {
  locationCompactJltStub,
  locationCompactKcStub,
  locationCompactMeydanStub,
  locationCompactSeasonsStub,
} from 'stubs/location';

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
import { propertySerpObfuscatedFieldListingLevel } from 'components/property/serp/obfuscated/field/listing-level';
import { propertySerpObfuscatedFieldLiveEventValue } from 'components/property/serp/obfuscated/field/live-event-value';
import { propertySerpObfuscatedFieldLocationTreeCompact } from 'components/property/serp/obfuscated/field/location-tree-compact';
import { propertySerpObfuscatedFieldLocationTreePath } from 'components/property/serp/obfuscated/field/location-tree-path';
import { propertySerpObfuscatedFieldName } from 'components/property/serp/obfuscated/field/name';
import { propertySerpObfuscatedFieldOfferingTypeName } from 'components/property/serp/obfuscated/field/offering-type-name';
import { propertySerpObfuscatedFieldPriceText } from 'components/property/serp/obfuscated/field/price-text';
import { propertySerpObfuscatedFieldPropertyTypeName } from 'components/property/serp/obfuscated/field/property-type-name';
import { propertySerpObfuscatedFieldPublishDateValue } from 'components/property/serp/obfuscated/field/publish-date-value';
import { propertySerpObfuscatedFieldQualityScore } from 'components/property/serp/obfuscated/field/quality-score';
import { propertySerpObfuscatedFieldReference } from 'components/property/serp/obfuscated/field/reference';
import { propertySerpObfuscatedFieldSize } from 'components/property/serp/obfuscated/field/size';
import { propertySerpObfuscatedFieldUrl } from 'components/property/serp/obfuscated/field/url';
import { propertySerpObfuscatedFieldUtilitiesPriceTypeName } from 'components/property/serp/obfuscated/field/utilities-price-type-name';
import { propertySerpObfuscatedFieldVerified } from 'components/property/serp/obfuscated/field/verified';
import { PropertySerpObfuscatedType } from 'components/property/serp/obfuscated/type';

export const propertyStub = (data: Partial<PropertySerpObfuscatedType> = {}): PropertySerpObfuscatedType =>
  ({
    [propertySerpObfuscatedFieldUrl]: 'url',
    [propertySerpObfuscatedFieldCompletionStatus]: 'off_plan',
    [propertySerpObfuscatedFieldQualityScore]: 60,
    [propertySerpObfuscatedFieldAgentId]: 'agentId',
    [propertySerpObfuscatedFieldDateInsert]: '2020-10-05T06:23:34+00:00',
    [propertySerpObfuscatedFieldBrokerId]: 'broker',
    [propertySerpObfuscatedFieldName]: 'Title from agent',
    [propertySerpObfuscatedFieldLocationTreeCompact]: [
      locationCompactKcStub,
      locationCompactJltStub,
      locationCompactMeydanStub,
      locationCompactSeasonsStub,
      locationCompactSeasonsStub,
    ],
    [propertySerpObfuscatedFieldVerified]: true,
    [propertySerpObfuscatedFieldListingLevel]: 'premium',
    [propertySerpObfuscatedFieldBathroomValue]: 3,
    [propertySerpObfuscatedFieldBedroomValue]: 2,
    [propertySerpObfuscatedFieldLocationTreePath]: 'Dubai, Marina',
    [propertySerpObfuscatedFieldExclusive]: true,
    [propertySerpObfuscatedFieldImgUrl]: 'img url',
    [propertySerpObfuscatedFieldReference]: '123',
    [propertySerpObfuscatedFieldPropertyTypeName]: 'Villa',
    [propertySerpObfuscatedFieldContactOptionsList]: contactOptionsEnabledStub,
    [propertySerpObfuscatedFieldPriceText]: '555,555 AED',
    [propertySerpObfuscatedFieldSize]: 300,
    [propertySerpObfuscatedFieldImagesCount]: 3,
    [propertySerpObfuscatedFieldId]: '198023',
    [propertySerpObfuscatedFieldDefaultPrice]: 100000,
    [propertySerpObfuscatedFieldLiveEventValue]: '',
    [propertySerpObfuscatedFieldAreaValue]: '550 Sqft',
    [propertySerpObfuscatedFieldPublishDateValue]: '1 hour ago',
    [propertySerpObfuscatedFieldOfferingTypeName]: 'offering-type',
    [propertySerpObfuscatedFieldUtilitiesPriceTypeName]: 'inclusive',
    ...data,
  } as PropertySerpObfuscatedType);
