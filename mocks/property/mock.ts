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
import { propertySerpObfuscatedFieldUrl } from 'components/property/serp/obfuscated/field/url';
import { propertySerpObfuscatedFieldVerified } from 'components/property/serp/obfuscated/field/verified';
import { PropertySerpObfuscatedType } from 'components/property/serp/obfuscated/type';

import { ContactOptionsMock } from 'mocks/contact-options/mock';

export const PropertyMock = (): PropertySerpObfuscatedType =>
  ({
    [propertySerpObfuscatedFieldUrl]: 'url',
    [propertySerpObfuscatedFieldName]: 'Title from agent',
    [propertySerpObfuscatedFieldVerified]: true,
    [propertySerpObfuscatedFieldListingLevel]: 'premium',
    [propertySerpObfuscatedFieldBathroomValue]: 3,
    [propertySerpObfuscatedFieldBedroomValue]: 2,
    [propertySerpObfuscatedFieldLocationTreePath]: 'Dubai, Marina',
    [propertySerpObfuscatedFieldExclusive]: true,
    [propertySerpObfuscatedFieldImgUrl]: 'img url',
    [propertySerpObfuscatedFieldPropertyTypeName]: 'Villa',
    [propertySerpObfuscatedFieldContactOptionsList]: ContactOptionsMock,
    [propertySerpObfuscatedFieldPriceText]: '555,555 AED',
    [propertySerpObfuscatedFieldImagesCount]: 3,
    [propertySerpObfuscatedFieldId]: '198023',
  } as PropertySerpObfuscatedType);
