import { urlQuerySerialize } from 'helpers/url-query/serialize';

import { mortgageGetPropertyLeadData } from './get-property-lead-data';
import { mortgageGetUtmTracking } from './get-utm-tracking';
import { MortgageUrlConfigInterface } from './url-config.interface';

/**
 * Generates a url with query params, based on supplied config, for mortgage finder widgets.
 *
 * @param baseUrl The base url to attach query params to.
 * @param config Data to include as query parameters in the generated url.
 */
export const mortgageGetUrl = (
  baseUrl: string = '',
  { propertyPrice, propertyReference, propertyId, downpayment, term, utm, leadModel }: MortgageUrlConfigInterface
): string => {
  const queryParams = {
    propertyvalue: String(propertyPrice),
    reference: propertyReference,
    propertyId,
    ...(downpayment && { downpayment: String(downpayment) }),
    ...(term && { term: String(term) }),
    ...mortgageGetUtmTracking(utm),
    ...mortgageGetPropertyLeadData(leadModel),
  };

  const queryParamsStr = urlQuerySerialize(queryParams);

  return `${baseUrl}&${queryParamsStr}`;
};
