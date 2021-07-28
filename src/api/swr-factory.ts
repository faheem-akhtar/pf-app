/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from 'next/dist/client/router';
import useSWR from 'swr';

import { ApiMakeFactory } from './make-factory';

import { ApiFactoryPropsInterface } from './factory-props.interface';
import { ApiSwrRequestPropsType } from './swr-request-props.type';
import { ApiSwrResultType } from './swr-result-type';
import { UrlQueryType } from 'types/url/query.type';

// TODO-FE[TPNX-3009] Add tests
/**
 * Create a fetcher that can be used as the react hook
 * @param factoryProps define static props for the request
 */
export const ApiSwrFactory = <R, Query = UrlQueryType>(
  factoryProps: ApiFactoryPropsInterface<R>
): ((props: ApiSwrRequestPropsType<Query>) => ApiSwrResultType<R>) => {
  const fetcher = ApiMakeFactory({ getOrigin: () => origin })<R>(factoryProps);

  return (props: ApiSwrRequestPropsType<Query>): ApiSwrResultType<R> => {
    const locale = useRouter().locale as string;

    let shouldFetch = !props.swrDoNotFetch;
    if (shouldFetch && factoryProps.requireAuth && !props.authToken) {
      shouldFetch = false;
    }
    const key = `${locale}-${factoryProps.url}-${factoryProps.method}-${JSON.stringify(props.query)}`;
    const swrResult = useSWR(shouldFetch ? key : null, () => fetcher({ ...props, locale }));

    return swrResult.isValidating || !swrResult.data ? { ok: null } : swrResult.data;
  };
};
