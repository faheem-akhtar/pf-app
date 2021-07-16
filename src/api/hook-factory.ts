import { useRouter } from 'next/dist/client/router';
import useSWR from 'swr';

import { apiMakeFactory } from './make-factory';

import { ApiFactoryPropsBaseInterface } from './factory-props.interface';
import { ApiFetcherResultType } from './fetcher-result-type';
import { ApiHookResultType } from './hook-result-type';
import { DataApiSwrRequestPropsType } from './swr-request-props.type';
import { UrlQuery } from 'helpers/types';

// TODO-FE[TPNX-3009] Add tests
/**
 * Create a fetcher that can be used as the react hook
 * @param factoryProps define static props for the request
 */
export const apiHookFactory = <R, Query = UrlQuery>(
  factoryProps: ApiFactoryPropsBaseInterface<R>
): ((props: DataApiSwrRequestPropsType<Query>) => ApiHookResultType<R>) => {
  const fetcher = apiMakeFactory({ getOrigin: () => origin })<R>(factoryProps);

  return (props: DataApiSwrRequestPropsType<Query>): ApiHookResultType<R> => {
    const locale = useRouter().locale as string;

    let shouldFetch = !props.swrDoNotFetch;
    if (shouldFetch && factoryProps.requireAuth && !props.authToken) {
      shouldFetch = false;
    }
    const key = `${locale}-${factoryProps.url}-${factoryProps.method}-${JSON.stringify(props.query)}`;
    const swrResult = useSWR(shouldFetch ? key : null, () => fetcher({ ...props, locale }));

    if (swrResult.isValidating) {
      return { ok: null };
    }

    const fetcherResult = swrResult.data as ApiFetcherResultType<R>;

    return fetcherResult;
  };
};
