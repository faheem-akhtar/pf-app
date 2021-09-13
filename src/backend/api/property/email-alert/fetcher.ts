import { BackendApiFactory } from 'backend/api/factory';
import { BackendJsonApiModelType } from 'backend/json-api/model.type';
import { configOriginIfDevUseStagingValue } from 'config/origin/if-dev-use-staging-value';
import { EmailAlertAttributesInterface } from 'types/email-alert/attributes.interface';

const fetcher = BackendApiFactory<BackendJsonApiModelType, BackendJsonApiModelType>({
  method: 'POST',
  url: 'email-alert',
  alterHeaders: (headers) => {
    headers['content-type'] = 'application/vnd.api+json';
  },
});

export const backendApiPropertyEmailAlertFetcher = (
  locale: string,
  attributes: EmailAlertAttributesInterface
): ReturnType<typeof fetcher> =>
  fetcher({
    locale,
    getOrigin: configOriginIfDevUseStagingValue,
    postData: {
      data: {
        type: 'email_alert',
        attributes,
      },
    },
  });
