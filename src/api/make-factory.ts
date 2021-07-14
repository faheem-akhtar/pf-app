import { ApiFactoryPropsBaseInterface } from './factory-props.interface';
import { ApiFetcherResultType } from './fetcher-result-type';
import { ApiMakeFactoryPropsInterface } from './make-factory-props.interface';
import { DataApiFetcherRequestProps } from './request-props.interface';
import { urlQuerySerialize } from '../helpers/url-query/serialize';

// TODO-FE[TPNX-3009] Add tests
/**
 * Base for all network requsts
 * Not to be used directly
 * Use one of [
 *   - apiHookFactory, to create a fetcher as react hook
 *   - backendApiFactory, to create fetcher to be used exclusively by backend code (adds headers that allow to bypass api protections)
 *   - apiFactory, to create a general fetcher with promise base api, that can be used in any environment
 * ]
 * @param makeFactoryProps Top level properties depending on the environment
 */
export const apiMakeFactory =
  (makeFactoryProps: ApiMakeFactoryPropsInterface) =>
  <Result, Data = Object, RawJson = Object>(factoryProps: ApiFactoryPropsBaseInterface<Result, Data, RawJson>) =>
  (props: DataApiFetcherRequestProps): Promise<ApiFetcherResultType<Result>> => {
    const { authToken, data } = props;

    const headers: Record<string, string> = {};

    if (makeFactoryProps.alterHeaders) {
      makeFactoryProps.alterHeaders(headers);
    }

    if (authToken) {
      headers['x-pf-jwt'] = `Bearer ${authToken}`;
    }

    const payload: Record<string, string | Record<string, string>> = {
      method: factoryProps.method,
      headers,
    };

    if (data) {
      payload.body = JSON.stringify({ data });
    }

    if (props.reloadCache) {
      payload.cache = 'reload';
    }

    if (factoryProps.method === 'HEAD') {
      payload.cache = 'no-cache';
    }

    const locale = props.locale;
    const basePath = `${makeFactoryProps.getOrigin()}/${locale}/api`;

    let finalUrl = `${basePath}/${factoryProps.url}`;

    if (factoryProps.queryDefaultParams || props.query) {
      finalUrl = `${finalUrl}?${urlQuerySerialize({
        ...factoryProps.queryDefaultParams,
        ...props.query,
      })}`;
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
            data = makeFactoryProps.dataMapper(data);
          }

          if (factoryProps.dataMapper) {
            data = factoryProps.dataMapper(data, json);
          }

          return {
            ok: true,
            data,
            headers,
          };
        });
    });
  };
