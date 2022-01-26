import { PropertyLeadInterface } from 'components/property/lead.interface';
import { FiltersCategoryIdEnum } from 'enums/filters/category-id.enum';

import { mortgageGetUrl } from '../get-url';
import { MortgageCampaignPropertyInterface } from './property.interface';

/**
 * Returns the campaign button URL based on the property category identifier
 */
export const mortgageCampaignGetButtonUrl = (
  categoryId: FiltersCategoryIdEnum,
  mortgageFinderUrl: string,
  property: MortgageCampaignPropertyInterface,
  leadModel: PropertyLeadInterface
): string =>
  mortgageGetUrl(mortgageFinderUrl, {
    propertyPrice: property.defaultPrice,
    propertyId: property.id,
    propertyReference: property.reference,
    utm: {
      source: 'propertyfinder-mobile',
      medium: 'popup',
      campaign: categoryId === FiltersCategoryIdEnum.residentialForSale ? 'lead-confirmation' : 'commercial-finance',
      content: 'get-pre-approved',
    },
    leadModel,
  });
