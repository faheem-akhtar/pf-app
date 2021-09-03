import { BackendApiFactory } from 'backend/api/factory';
import { BackendJsonApiModelType } from 'backend/json-api/model.type';
import { configOriginIfDevUseStagingValue } from 'config/origin/if-dev-use-staging-value';
import { EmailShareAttributesInterface } from 'types/email-share/attributes-interface';

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
  attributes: EmailShareAttributesInterface
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
