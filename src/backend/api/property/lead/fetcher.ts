import { BackendApiFactory } from 'backend/api/factory';
import { BackendJsonApiModelType } from 'backend/json-api/model.type';
import { PropertyLeadAttributesInterface } from 'types/property/lead/attributes.interface';

import { configOriginIfDevUseStagingValue } from 'config/origin/if-dev-use-staging-value';

type getFetcherReturnType = ReturnType<typeof BackendApiFactory>;

const getFetcher = (url: string): getFetcherReturnType =>
  BackendApiFactory<BackendJsonApiModelType, BackendJsonApiModelType>({
    method: 'POST',
    url,
    alterHeaders: (headers) => {
      headers['content-type'] = 'application/vnd.api+json';
    },
  });

export const backendApiPropertyLeadFetcher = (
  locale: string,
  propertyId: string,
  attributes: PropertyLeadAttributesInterface
): ReturnType<getFetcherReturnType> => {
  const fetcher = getFetcher(`property/${propertyId}/lead`);

  return fetcher({
    locale,
    getOrigin: configOriginIfDevUseStagingValue,
    postData: {
      data: {
        type: 'property_lead',
        attributes,
      },
    },
  });
};
