import { LocationTypeEnum } from 'enums/location/type.enum';

import { BackendApiPropertySearchJsonApiResultType } from '../json-api-result.type';
import { BackendApiPropertySearchEmailAgentDataResultType } from './result-type';

export const backendApiPropertySearchEmailAgentDataMapper = ({
  properties,
}: BackendApiPropertySearchJsonApiResultType): BackendApiPropertySearchEmailAgentDataResultType => {
  const locations = properties[0].location_tree;
  let propertyLocationId: number;

  if (Array.isArray(locations) && locations.length) {
    let lastLocation = locations[locations.length - 1];

    if (lastLocation.location_type.toUpperCase() === LocationTypeEnum.tower && locations.length >= 2) {
      // Can't set location_id of 'TOWER', so use the location before it
      lastLocation = locations[locations.length - 2];
    }

    propertyLocationId = parseInt(lastLocation.id, 10);
  } else {
    throw new Error(`No location available for property ${properties[0].id}`);
  }

  return {
    propertyLocationId,
    amenities: properties[0].property_type.amenities?.map((amenity) => amenity.id) || [],
    categoryId: parseInt(properties[0].category_id, 10),
    propertyTypeId: parseInt(properties[0].property_type.id, 10),
  };
};
