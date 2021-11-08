import { backendPropertySerpObfuscate } from 'backend/property/serp-obfuscate';
import { PropertyContactOptionsListInterface } from 'components/property/contact-options-list.interface';
import { PropertySerpInterface } from 'components/property/serp/interface';
import { PropertySerpSearchResultType } from 'components/property/serp/search-result.type';
import { configIsTrace } from 'config/is-trace';
import { configPropertyHideEmailIfWhatsappPresent } from 'config/property/hide-email-if-whatsapp-present';

import { BackendApiPropertySearchJsonApiResultType } from './json-api-result.type';
import { BackendApiPropertySearchRawJsonResponseType } from './raw-json-response-type';

// TODO-FE[CX-409] add tests
export const backendApiPropertySearchMapper = (
  data: BackendApiPropertySearchJsonApiResultType,
  rawJson: BackendApiPropertySearchRawJsonResponseType
): PropertySerpSearchResultType => {
  const { properties } = [...data.cts, ...data.smart_ads, ...data.direct_from_developer, ...data.properties].reduce<{
    properties: PropertySerpInterface[];
    set: Set<string>;
  }>(
    (acc, property) => {
      const {
        area,
        name,
        links,
        verified,
        listing_level,
        bathroom_value,
        bedroom_value,
        quality_score,
        location_tree_path,
        completion_status,
        location_tree,
        exclusive,
        property_type,
        meta,
        size,
        reference,
        date_insert,
        default_price,
      } = property;

      const { listed_at_message, live_event_metadata, video_metadata } = meta;
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
        area,
        liveEvent: !!live_event_metadata,
        publishDate: listed_at_message,
        name,
        verified,
        listingLevel: listing_level,
        bathroomValue: bathroom_value,
        bedroomValue: bedroom_value,
        locationTreePath: location_tree_path,
        exclusive,
        url: links.self,
        imgUrl: links.image_property_medium,
        // TODO-FE[CX-373] remove imgUrlSmall
        imgUrlSmall: links.image_property_small,
        imagesCount: meta.images_count,
        propertyTypeName: property_type.name,
        locationTreeCompact:
          location_tree?.map((location) => ({
            id: location.id,
            name: location.name,
            location_type: location.location_type,
          })) || [],
        contactOptionsList,
        priceText: meta.price_text,
        qualityScore: quality_score,
        dateInsert: new Date(date_insert).toDateString(),
        id: property.id,
        completionStatus: completion_status,
        reference,
        size,
        agentId: property.agent?.id || '',
        brokerId: property.broker?.id || '',
        defaultPrice: default_price,
        videoTour: video_metadata,
        offeringType: property.offering_type,
      };

      if (configIsTrace) {
        (propertyCompact as unknown as Record<string, Object>).__full = JSON.parse(JSON.stringify(property));
      }

      if (!acc.set.has(property.id)) {
        acc.properties.push(propertyCompact);
        acc.set.add(property.id);
      }

      return acc;
    },
    { properties: [], set: new Set() }
  );

  const result: PropertySerpSearchResultType = {
    title: data.meta.meta_title,
    properties: properties.map(backendPropertySerpObfuscate),
    adConfig: {
      ad_targeting: data.meta.ad_targeting,
      ad_placeholders: data.meta.ad_placeholders,
    },
    total: rawJson.data.relationships.properties.meta.total_count,
    pages: rawJson.data.relationships.properties.meta.page_count,
  };

  if (configIsTrace) {
    (result as unknown as Record<string, Object>).__full = JSON.parse(JSON.stringify(data));
  }

  return result;
};
