import { ApiPropertyShareRequestInterface } from 'api/property/share/request-interface';
import { BackendApiFactory } from 'backend/api/factory';
import { BackendJsonApiModelType } from 'backend/json-api/model.type';
import { configOriginIfDevUseStagingValue } from 'config/origin/if-dev-use-staging-value';

const fetcher = BackendApiFactory<null, BackendJsonApiModelType>({
  method: 'POST',
  url: '',
  alterHeaders: (headers) => {
    headers['content-type'] = 'application/vnd.api+json';
    delete headers['Host'];
  },
});

export const backendApiPropertyShareFetcher = (
  locale: string,
  propertyId: string,
  attributes: ApiPropertyShareRequestInterface
): ReturnType<ReturnType<typeof BackendApiFactory>> => {
  return fetcher({
    locale,
    getOrigin: configOriginIfDevUseStagingValue,
    url: `property/${propertyId}/share`,
    postData: {
      data: {
        type: 'property_share',
        attributes,
      },
    },
  });
};
