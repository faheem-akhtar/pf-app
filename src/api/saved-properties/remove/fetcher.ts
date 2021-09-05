import { AnyValueType } from 'types/any/value.type';
import { ApiAuthRequiredFactory } from 'api/auth-required-factory';
import { ApiFetcherResultType } from 'api/fetcher-result-type';
import { ApiRequestPropsType } from 'api/request-props.type';
import { LocaleService } from 'services/locale/service';

const fetcher = (
  propertyId: string
): (<QueryData>(props: ApiRequestPropsType<QueryData, AnyValueType>) => Promise<ApiFetcherResultType<null>>) =>
  ApiAuthRequiredFactory<null>({
    method: 'DELETE',
    url: `user/saved-property/${propertyId}`,
  });

export const apiSavedPropertiesRemoveFetcher = (requestParams: {
  propertyId: string;
}): Promise<ApiFetcherResultType<null>> => {
  const locale = LocaleService.getLocale();

  return fetcher(requestParams.propertyId)({ locale });
};
