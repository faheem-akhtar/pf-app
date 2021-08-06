import { backendPropertySerpObfuscate } from 'backend/property/serp-obfuscate';
import { configIsTrace } from 'config/is-trace';
import { configPropertyHideEmailIfWhatsappPresent } from 'config/property/hide-email-if-whatsapp-present';

import { BackendApiPropertySearchJsonApiResultType } from './json-api-result.type';
import { BackendApiPropertySearchRawJsonResponseType } from './raw-json-response-type';
import { PropertyContactOptionsListInterface } from 'components/property/contact-options-list.interface';
import { PropertySerpInterface } from 'components/property/serp/interface';
import { PropertySerpSearchResultType } from 'components/property/serp/search-result.type';

export const backendApiPropertySearchMapper = (
  data: BackendApiPropertySearchJsonApiResultType,
  rawJson: BackendApiPropertySearchRawJsonResponseType
): PropertySerpSearchResultType => {
  const properties: PropertySerpInterface[] = data.properties.map((property) => {
    const {
      name,
      links,
      verified,
      listing_level,
      bathroom_value,
      bedroom_value,
      location_tree_path,
      exclusive,
      property_type,
      meta,
    } = property;

    const { email, phone, whatsapp } = meta.contact_options.app;

    const contactOptionsList: PropertyContactOptionsListInterface = { email: !!email };

    if (phone) {
      contactOptionsList.phone = phone;
    }

    if (whatsapp) {
      contactOptionsList.whatsapp = whatsapp;
      if (configPropertyHideEmailIfWhatsappPresent) {
        contactOptionsList.email = false;
      }
    }

    const propertyCompact: PropertySerpInterface = {
      name,
      verified,
      listingLevel: listing_level,
      bathroomValue: bathroom_value,
      bedroomValue: bedroom_value,
      locationTreePath: location_tree_path,
      exclusive,
      url: links.self,
      imgUrl: links.image_property_small,
      imagesCount: meta.images_count,
      propertyTypeName: property_type.name,
      contactOptionsList,
      priceText: meta.price_text,
      id: property.id,
    };

    if (configIsTrace) {
      (propertyCompact as unknown as Record<string, Object>).__full = JSON.parse(JSON.stringify(property));
    }

    return propertyCompact;
  });

  const result: PropertySerpSearchResultType = {
    properties: properties.map(backendPropertySerpObfuscate),
    total: rawJson.data.relationships.properties.meta.total_count,
    pages: rawJson.data.relationships.properties.meta.page_count,
  };

  if (configIsTrace) {
    (result as unknown as Record<string, Object>).__full = JSON.parse(JSON.stringify(data));
  }

  return result;
};