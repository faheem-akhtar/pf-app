import { StatsDataPropertyInterface } from '@propertyfinder/pf-frontend-common/dist/module/stats/data/property.interface';
import { PropertyCompletionStatusType } from '@propertyfinder/pf-frontend-common/dist/module/stats/types';

import { BackendModelPropertyCategoryIdentifierEnum } from 'backend/model/property/category-identifier.enum';
import { BackendModelPropertyInterface } from 'backend/model/property/interface';
import { PROPERTY_SERP_ITEMS_PER_PAGE } from 'components/property/serp/items-per-page.constant';
import { configCommon } from 'config/common';

const getListingStatusDisplayed = (property: BackendModelPropertyInterface): string => {
  return property.areaSpecialistProperty ? 'Area Specialist Property' : property.listing_level_label;
};

const isRental = (category: BackendModelPropertyCategoryIdentifierEnum): boolean => {
  const rentalCategories = [
    BackendModelPropertyCategoryIdentifierEnum.residentialForRent,
    BackendModelPropertyCategoryIdentifierEnum.commercialForRent,
  ];

  return rentalCategories.includes(category);
};

const getCompletionStatus = (completionStatus: string | null): PropertyCompletionStatusType => {
  // Back end will return either 'off_plan', off plan', 'completed' or NULL
  const completionStatusMapping: {
    [key: string]: PropertyCompletionStatusType;
  } = {
    off_plan: 'off_plan',
    'off plan': 'off_plan',
    completed: 'completed',
  };

  return completionStatusMapping[completionStatus as string] || null;
};

export const backendApiPropertyStatsDataSingleModelMakeMapper =
  (pageNumber: number) =>
  (propertyModel: BackendModelPropertyInterface, index: number): StatsDataPropertyInterface => ({
    id: parseInt(propertyModel.id, 10),
    referenceNumber: propertyModel.reference,
    bedrooms: String(propertyModel.bedroom_value),
    bathrooms: String(propertyModel.bathroom_value),
    agent: {
      id: propertyModel.agent ? parseInt(propertyModel.agent.id, 10) : 0,
      name: propertyModel.agent ? propertyModel.agent.name : '',
      isVerified: propertyModel.agent ? propertyModel.agent.verification_status === 'verified' : false,
    },
    broker: {
      id: propertyModel.broker ? parseInt(propertyModel.broker.id, 10) : 0,
      name: propertyModel.broker ? propertyModel.broker.name : '',
    },
    title: propertyModel.name,
    url: propertyModel.links.self,
    image: propertyModel.links.image_property,
    licenseRera: propertyModel.rera,
    offeringType: propertyModel.category_identifier,
    housingType: propertyModel.type_identifier,
    housingTypeId: Number(propertyModel.property_type?.id),
    listingStatus: propertyModel.listing_level,
    listingStatusDisplayed: getListingStatusDisplayed(propertyModel),
    rentalPeriod: isRental(propertyModel.category_identifier) ? propertyModel.price_period_label : '',
    rentalPeriodId: isRental(propertyModel.category_identifier) ? propertyModel.price_period_identifier : '',
    size: propertyModel.size,
    agentUserId: parseInt((propertyModel.agent && propertyModel.agent.user_id) || '0'),
    verified: propertyModel.verified ? 'Verified' : 'Not verified',
    qs: propertyModel.quality_score,
    rsp: propertyModel.rsp,
    rss: propertyModel.rss,
    furnished: propertyModel.furnished,
    images: propertyModel.meta.images_count,
    locations: (propertyModel.location_tree || []).map((location) => parseInt(location.id, 10)),
    getPriceOnApp: !!propertyModel.price_on_application,
    price: propertyModel.meta.price,
    priceTxt: propertyModel.meta.price_text,
    currency: configCommon.currencyCode,
    subtitle: propertyModel.meta.subtitle,
    mortgageRent: false,
    moveSouq: false,
    position: PROPERTY_SERP_ITEMS_PER_PAGE * (pageNumber - 1) + index + 1,
    positionPage: index + 1,
    isSmartAd: propertyModel.smart_ad ? 1 : 0,
    isCtsProperty: propertyModel.cts ? 1 : 0,
    isAreaSpecialistProperty: propertyModel.areaSpecialistProperty ? 1 : 0,
    completionStatus: getCompletionStatus(propertyModel.completion_status),
    isExclusive: propertyModel.exclusive,
    has360View: !!propertyModel.view_360,
    newProjects: !!propertyModel.new_projects,
  });
