import { ApiAuthRequiredFactory } from 'api/auth-required-factory';
import { ApiFetcherResultType } from 'api/fetcher-result-type';
import { ApiRequestPropsType } from 'api/request-props.type';
import { LocaleService } from 'services/locale/service';

const fetcher = ApiAuthRequiredFactory<ApiRequestPropsType, ApiRequestPropsType>({
  method: 'POST',
  url: 'user/logout',
  alterHeaders: (headers) => {
    headers['content-type'] = 'application/vnd.api+json';
  },
  // TODO-FE[TPNX-3188] - Add data adapter if needed
});

export const apiAuthLogoutFetcher = (): Promise<ApiFetcherResultType<ApiRequestPropsType>> => {
  const locale = LocaleService.getLocale();
  return fetcher({
    locale,
  });
};
