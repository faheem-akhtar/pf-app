import { AnyValueType } from 'types/any/value.type';
import { ApiFactoryPropsInterface } from './factory-props.interface';
import { ApiFetcherResultType } from './fetcher-result-type';
import { ApiHeaderEnum } from 'enums/api/header.enum';
import { ApiMakeFactoryPropsInterface } from './make-factory-props.interface';
import { ApiRequestPropsType } from './request-props.type';

import { configIsTrace } from 'config/is-trace';
import { urlQuerySerialize } from 'helpers/url-query/serialize';

// TODO-FE[TPNX-3009] Add tests
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
  (makeFactoryProps: ApiMakeFactoryPropsInterface) =>
  <Result, Data = AnyValueType, RawJson = AnyValueType>(
    factoryProps: ApiFactoryPropsInterface<Result, Data, RawJson>
  ) =>
  <QueryData>(props: ApiRequestPropsType<QueryData>): Promise<ApiFetcherResultType<Result>> => {
    const { authToken, locale, postData } = props;

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

    if (factoryProps.requireAuth && authToken) {
      headers[ApiHeaderEnum.auth] = `Bearer ${authToken}`;
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

    const getOrigin = props.getOrigin || makeFactoryProps.getOrigin;

    const basePath = `${getOrigin()}/${locale}/api`;

    let finalUrl = `${basePath}/${factoryProps.url}`;

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

    return fetch(finalUrl, payload).then((response) => {
      const { headers } = response;

      if (!response.ok) {
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
          data: null,
          headers,
        };
      }

      return response
        .json()
        .catch((e: Error) => {
          return {
            ok: false,
            error: e.message,
          };
        })
        .then((json) => {
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
        });
    });
  };
