import { BackendApiPropertySearchJsonApiResultType } from './json-api-result.type';
import { PropertySearchResultType } from 'components/property/search-result.type';
import { PropertySerpInterface } from 'components/property/serp.interface';
import { isTrace } from 'config/is-trace';

export const backendApiPropertySearchMapper = (
  data: BackendApiPropertySearchJsonApiResultType
): PropertySearchResultType => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const properties = data.properties.map((property) => {
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
      propertyTypeName: property_type.name,
      contactOptionsList: {
        ...meta.contact_options.list,
        email: !!meta.contact_options.list.email,
      },
      priceText: meta.price_text,
    };

    if (isTrace) {
      (propertyCompact as unknown as Record<string, Object>).full = JSON.parse(JSON.stringify(property));
    }

    return propertyCompact;
  });

  const result: PropertySearchResultType = {
    properties,
    // TODO-FE[TPNX-3048] gather the total and pages from the search response
    // The problem now is that the sync method is stripping out the meta for properties
    total: 0,
    pages: 0,
  };

  if (isTrace) {
    (result as unknown as Record<string, Object>).full = JSON.parse(JSON.stringify(data));
  }

  return result;
};
