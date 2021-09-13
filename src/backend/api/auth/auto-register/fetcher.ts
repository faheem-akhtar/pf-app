import { ApiAuthAutoRegisterRequestInterface } from 'api/auth/auto-register/request.interface';
import { BackendApiFactory } from 'backend/api/factory';
import { BackendJsonApiModelType } from 'backend/json-api/model.type';
import { configOriginIfDevUseStagingValue } from 'config/origin/if-dev-use-staging-value';

const fetcher = BackendApiFactory<BackendJsonApiModelType, BackendJsonApiModelType>({
  method: 'POST',
  url: 'user/auto-register',
  alterHeaders: (headers) => {
    headers['content-type'] = 'application/vnd.api+json';
  },
});

export const backendApiAuthAutoRegisterFetcher = (
  locale: string,
  attributes: ApiAuthAutoRegisterRequestInterface
): ReturnType<typeof fetcher> =>
  fetcher({
    locale,
    getOrigin: configOriginIfDevUseStagingValue,
    postData: {
      data: {
        type: 'user_auto_register',
        attributes,
      },
    },
  });
