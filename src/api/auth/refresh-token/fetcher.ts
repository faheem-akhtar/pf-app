import { ApiFactory } from 'api/factory';
import { ApiFetcherResultType } from 'api/fetcher-result-type';
import { ApiHeaderEnum } from 'enums/api/header.enum';
import { LocaleService } from 'services/locale/service';

import { ApiAuthRefreshTokenModelInterface } from './model.interface';

const fetcher = ApiFactory<ApiAuthRefreshTokenModelInterface>({
  method: 'POST',
  url: 'user/refresh-token',
  alterHeaders: (headers) => {
    headers['content-type'] = 'application/vnd.api+json';
  },
});

export const apiAuthRefreshTokenFetcher = (props: {
  authToken: string;
  refreshToken: string;
}): Promise<ApiFetcherResultType<ApiAuthRefreshTokenModelInterface>> => {
  const locale = LocaleService.getLocale();
  return fetcher({
    locale,
    alterHeaders: (headers) => {
      headers[ApiHeaderEnum.auth] = `Bearer ${props.authToken}`;
    },
    postData: {
      data: {
        type: 'user_refresh_token',
        attributes: {
          value: props.refreshToken,
        },
      },
    },
  });
};
