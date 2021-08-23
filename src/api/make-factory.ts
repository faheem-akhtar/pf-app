import { AnyValueType } from 'types/any/value.type';
import { ApiFactoryPropsInterface } from './factory-props.interface';
import { ApiFetcherResultType } from './fetcher-result-type';
import { ApiHeaderEnum } from 'enums/api/header.enum';
import { ApiMakeFactoryPropsType } from './make-factory-props.type';
import { ApiRequestPropsType } from './request-props.type';

import { configIsTrace } from 'config/is-trace';
import { urlQuerySerialize } from 'helpers/url-query/serialize';

/**
 * Base for all network requsts
 * Not to be used directly
 * Use one of [
 *   - ApiSwrFactory, to create a fetcher as react hook
 *   - BackendApiFactory, to create fetcher to be used exclusively by backend code (adds headers that allow to bypass api protections)
 *   - ApiFactory, to create a general fetcher with promise base api, that can be used in any environment
 * ]
 * @param makeFactoryProps Top level properties depending on the environment
 */
export const ApiMakeFactory =
  (makeFactoryProps: ApiMakeFactoryPropsType) =>
  <Result, Data = AnyValueType, RawJson = AnyValueType>(
    factoryProps: ApiFactoryPropsInterface<Result, Data, RawJson>
  ) =>
  <QueryData>(
    props: ApiRequestPropsType<QueryData>,
    shouldRetryOn401 = true
  ): Promise<ApiFetcherResultType<Result>> => {
    const { locale, postData } = props;

    const headers: Record<string, string> = {};

    if (makeFactoryProps.alterHeaders) {
      makeFactoryProps.alterHeaders(headers);
    }
    if (factoryProps.alterHeaders) {
      factoryProps.alterHeaders(headers);
    }
    if (props.alterHeaders) {
      props.alterHeaders(headers);
    }

    const getOrigin = props.getOrigin || makeFactoryProps.getOrigin;

    const basePath = `${getOrigin()}/${locale}/api`;

    let finalUrl = `${basePath}/${factoryProps.url}`;

    if (makeFactoryProps.requireAuth) {
      const token = makeFactoryProps.jwtTokenService.getToken();
      if (!token) {
        return Promise.resolve({
          ok: false,
          error: {
            url: finalUrl,
            status: 0,
            body: 'Can not fetch this url without authToken.',
          },
          headers: null,
        });
      }
      headers[ApiHeaderEnum.auth] = `Bearer ${token}`;
    }

    headers[ApiHeaderEnum.locale] = locale;

    const payload: Record<string, string | Record<string, string>> = {
      method: factoryProps.method,
      headers,
    };

    if (props.reloadCache) {
      payload.cache = 'reload';
    }

    if (factoryProps.method === 'HEAD') {
      payload.cache = 'no-cache';
    }

    if (factoryProps.method === 'POST') {
      payload.body = JSON.stringify(postData);
    }

    if (factoryProps.queryDefaultParams || props.query) {
      finalUrl = `${finalUrl}?${urlQuerySerialize({
        ...factoryProps.queryDefaultParams,
        ...props.query,
      })}`;
    }

    if (configIsTrace) {
      // eslint-disable-next-line no-console
      console.log('fetch', finalUrl, payload);
    }

    return fetch(finalUrl, payload).then(
      (response): ApiFetcherResultType<Result> | Promise<ApiFetcherResultType<Result>> => {
        const { headers } = response;

        if (!response.ok) {
          if (makeFactoryProps.requireAuth && response.status === 401 && shouldRetryOn401) {
            return makeFactoryProps.jwtTokenService.refreshToken().then((): Promise<ApiFetcherResultType<Result>> => {
              return ApiMakeFactory(makeFactoryProps)(factoryProps)(props, false);
            });
          }

          return response.text().then((body) => {
            return {
              ok: false,
              error: {
                url: finalUrl,
                status: response.status,
                body,
              },
              headers,
            };
          });
        }

        if (factoryProps.method === 'HEAD') {
          return {
            ok: true,
            data: null as unknown as Result,
            headers,
          };
        }

        return response
          .json()
          .then((json): ApiFetcherResultType<Result> => {
            let data = json;

            if (makeFactoryProps.dataMapper) {
              try {
                data = makeFactoryProps.dataMapper(data);
              } catch (e) {
                const error: string = `failed to execute makeFactoryProps.dataMapper for: ${finalUrl}. ${e.message}`;
                // eslint-disable-next-line no-console
                console.error(error);

                return {
                  ok: false,
                  error: {
                    url: finalUrl,
                    status: response.status,
                    body: error,
                  },
                  headers,
                };
              }
            }

            if (factoryProps.dataMapper) {
              try {
                data = factoryProps.dataMapper(data, json);
              } catch (e) {
                const error: string = `failed to execute factoryProps.dataMapper for: ${finalUrl}. ${e.message}`;
                // eslint-disable-next-line no-console
                console.error(error);

                return {
                  ok: false,
                  error: {
                    url: finalUrl,
                    status: response.status,
                    body: error,
                  },
                  headers,
                };
              }
            }

            return {
              ok: true,
              data,
              headers,
            };
          })
          .catch((e: Error) => {
            return {
              ok: false,
              error: e.message,
            };
          }) as Promise<ApiFetcherResultType<Result>>;
      }
    );
  };
