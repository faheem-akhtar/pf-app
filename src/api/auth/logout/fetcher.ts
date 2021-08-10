import { ApiFactory } from 'api/factory';
import { ApiFetcherResultType } from 'api/fetcher-result-type';
import { ApiRequestPropsType } from 'api/request-props.type';
import { LocaleService } from 'services/locale/service';

const fetcher = ApiFactory<ApiRequestPropsType, ApiRequestPropsType>({
  method: 'POST',
  url: 'user/logout',
  requireAuth: true,
  alterHeaders: (headers) => {
    headers['content-type'] = 'application/vnd.api+json';
  },
  // TODO-FE[TPNX-3188] - Add data adapter if needed
});

export const apiAuthLogoutFetcher = (requestParams: {
  authToken: string;
}): Promise<ApiFetcherResultType<ApiRequestPropsType>> => {
  const locale = LocaleService.getLocale();
  return fetcher({
    locale,
    postData: {
      authToken: requestParams.authToken,
    },
  });
};
