import { ApiAuthSocialLoginModelInterface } from 'api/auth/social-login/model.interface';
import { ApiAuthSocialLoginRequestInterface } from 'api/auth/social-login/request.interface';
import { ApiAuthSocialLoginResponseInterface } from 'api/auth/social-login/response.interface';
import { ApiFactory } from 'api/factory';
import { ApiFetcherResultType } from 'api/fetcher-result-type';
import { ApiJsonModelInterface } from 'api/json/model.interface';
import { ApiRequestPropsType } from 'api/request-props.type';
import { AnyValueType } from 'types/any/value.type';

export const ApiAuthSocialLoginFetcherFactory = ({
  url,
}: {
  url: string;
}): (<QueryData>(
  props: ApiRequestPropsType<QueryData, AnyValueType>
) => Promise<ApiFetcherResultType<ApiAuthSocialLoginModelInterface>>) =>
  ApiFactory<
    ApiAuthSocialLoginModelInterface,
    ApiAuthSocialLoginResponseInterface,
    ApiJsonModelInterface<ApiAuthSocialLoginRequestInterface>
  >({
    method: 'POST',
    url,
    alterHeaders: (headers) => {
      headers['content-type'] = 'application/vnd.api+json';
    },
    dataMapper: (data) => {
      return {
        user: {
          email: data.included[0].attributes.email,
          first_name: data.included[0].attributes.first_name,
          last_name: data.included[0].attributes.last_name,
          image: data.included[0].attributes.image,
          userId: data.data.relationships.user.data.id,
        },
        meta: {
          token: data.data.meta.token,
          refresh_token: data.data.meta.refresh_token,
        },
        email: data.included[0].attributes.email,
      };
    },
  });
