/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { AnyValueType } from 'types/any/value.type';
import { ApiFactoryPropsInterface } from './factory-props.interface';
import { ApiMakeFactory } from './make-factory';
import { ApiMakeSwrFactoryPropsType } from './make-swr-factory-props.type';
import { ApiSwrRequestPropsType } from './swr-request-props.type';
import { ApiSwrResultType } from './swr-result-type';

import { useJwtToken } from 'services/jwt/token/hook';

// TODO-FE[TPNX-3009] Add tests
/**
 * Create a fetcher that can be used as the react hook
 * @param factoryProps define static props for the request
 */
export const ApiMakeSwrFactory =
  (makeFactoryProps: ApiMakeSwrFactoryPropsType) =>
  <R, Data = AnyValueType, RawJson = AnyValueType>(
    factoryProps: ApiFactoryPropsInterface<R, Data, RawJson>
  ): ((props: ApiSwrRequestPropsType) => ApiSwrResultType<R>) => {
    const fetcher = makeFactoryProps.requireAuth
      ? ApiMakeFactory({
          getOrigin: () => origin,
          jwtTokenService: makeFactoryProps.jwtTokenService,
          requireAuth: true,
        })<R, Data, RawJson>(factoryProps)
      : ApiMakeFactory({
          getOrigin: () => origin,
          requireAuth: false,
        })<R, Data, RawJson>(factoryProps);

    return (props: ApiSwrRequestPropsType): ApiSwrResultType<R> => {
      const locale = useRouter().locale as string;
      const authToken = useJwtToken();

      let shouldFetch = !props.swrDoNotFetch;
      if (shouldFetch && makeFactoryProps.requireAuth && !authToken) {
        shouldFetch = false;
      }
      const key = `${locale}-${factoryProps.url}-${factoryProps.method}-${JSON.stringify(props.query)}`;
      const swrResult = useSWR(shouldFetch ? key : null, () => fetcher({ ...props, locale }));

      return swrResult.isValidating || !swrResult.data ? { ok: null } : swrResult.data;
    };
  };
