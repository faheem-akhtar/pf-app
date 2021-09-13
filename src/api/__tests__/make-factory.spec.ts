import { mockWindowConsole } from 'mocks/window/console.mock';
import { mockWindowFetch } from 'mocks/window/fetch.mock';

import { ApiMakeFactory } from 'api/make-factory';
import { JwtTokenStore } from 'services/jwt/token/store';

describe('ApiFactory', () => {
  const origin = 'origin';
  const url = 'url';

  it('should pwa prefix if request is handled by pf-web-app', async () => {
    const fetchMock = mockWindowFetch();

    const apiFactory = ApiMakeFactory({
      getOrigin: () => origin,
      requireAuth: false,
    });
    const fetcher = apiFactory({
      method: 'GET',
      url,
      handledByPfWebApp: true,
    });

    await fetcher({
      locale: 'en',
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith('origin/en/api/pwa/url', {
      headers: {
        locale: 'en',
      },
      method: 'GET',
    });
  });

  it('should be able set headers on every level', async () => {
    const fetchMock = mockWindowFetch();

    const apiFactory = ApiMakeFactory({
      getOrigin: () => origin,
      requireAuth: false,
      alterHeaders: (headers) => {
        headers['make-factory-level'] = '1';
      },
    });
    const fetcher = apiFactory({
      method: 'GET',
      url,
      alterHeaders: (headers) => {
        headers['factory-level'] = '2';
      },
    });

    await fetcher({
      locale: 'en',
      alterHeaders: (headers) => {
        headers['fetch-level'] = '3';
      },
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith('origin/en/api/url', {
      headers: {
        'factory-level': '2',
        'fetch-level': '3',
        'make-factory-level': '1',
        locale: 'en',
      },
      method: 'GET',
    });
  });

  it('should resolve with error when auth is required but no auth token available', async () => {
    const fetchMock = mockWindowFetch();

    const apiFactory = ApiMakeFactory({
      getOrigin: () => origin,
      requireAuth: true,
      jwtTokenService: new JwtTokenStore(),
    });

    const fetcher = apiFactory({ method: 'GET', url });

    const result = await fetcher({ locale: 'en' });

    expect(fetchMock).toHaveBeenCalledTimes(0);
    expect(result).toEqual({
      error: {
        body: 'Can not fetch this url without authToken.',
        status: 0,
        url: 'origin/en/api/url',
      },
      headers: null,
      ok: false,
    });
  });

  it('should add the Bearer header when auth is required and authToken is present', async () => {
    const fetchMock = mockWindowFetch();

    const jwtTokenService = new JwtTokenStore();
    jwtTokenService.getToken = jest.fn().mockReturnValue('test-token');
    const apiFactory = ApiMakeFactory({
      getOrigin: () => origin,
      requireAuth: true,
      jwtTokenService,
    });

    const fetcher = apiFactory({ method: 'GET', url });

    await fetcher({ locale: 'en' });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith('origin/en/api/url', {
      headers: { locale: 'en', 'x-pf-jwt': 'Bearer test-token' },
      method: 'GET',
    });
  });

  it('should add cache reload when reloadCache is true', async () => {
    const fetchMock = mockWindowFetch();

    const apiFactory = ApiMakeFactory({
      getOrigin: () => origin,
      requireAuth: false,
    });

    const fetcher = apiFactory({ method: 'GET', url });

    await fetcher({ locale: 'en', reloadCache: true });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith('origin/en/api/url', {
      cache: 'reload',
      headers: { locale: 'en' },
      method: 'GET',
    });
  });

  test('if method is HEAD should set no-cache', async () => {
    const fetchMock = mockWindowFetch();

    const apiFactory = ApiMakeFactory({
      getOrigin: () => origin,
      requireAuth: false,
    });

    const fetcher = apiFactory({ method: 'HEAD', url });

    await fetcher({ locale: 'en' });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith('origin/en/api/url', {
      cache: 'no-cache',
      headers: { locale: 'en' },
      method: 'HEAD',
    });
  });

  it('should return success status for empty response', async () => {
    const headerGetMock = jest.fn().mockReturnValue('0');
    mockWindowFetch({ ok: true, status: 200, headers: { get: headerGetMock } });

    const apiFactory = ApiMakeFactory({
      getOrigin: () => origin,
      requireAuth: false,
    });

    const fetcher = apiFactory({ method: 'GET', url });
    const response = await fetcher({ locale: 'en' });

    expect(headerGetMock).toHaveBeenCalledWith('content-length');
    expect(response).toEqual(expect.objectContaining({ ok: true, data: {} }));
  });

  it('should return success status for 202 accepted response', async () => {
    const headerGetMock = jest.fn().mockReturnValue('0');
    mockWindowFetch({ ok: true, status: 202, headers: { get: headerGetMock } });

    const apiFactory = ApiMakeFactory({
      getOrigin: () => origin,
      requireAuth: false,
    });

    const fetcher = apiFactory({ method: 'GET', url });
    const response = await fetcher({ locale: 'en' });

    expect(response).toEqual(expect.objectContaining({ ok: true, data: null }));
  });

  it('should return success status with empty body on 204', async () => {
    mockWindowFetch({ ok: true, status: 204 });

    const apiFactory = ApiMakeFactory({
      getOrigin: () => origin,
      requireAuth: false,
    });

    const fetcher = apiFactory({ method: 'POST', url });

    const response = await fetcher({ locale: 'en' });

    expect(response).toEqual(
      expect.objectContaining({
        data: null,
        ok: true,
      })
    );
  });

  it('should pass the body to payload if type is formData', async () => {
    const fetchMock = mockWindowFetch();
    const apiFactory = ApiMakeFactory({
      getOrigin: () => origin,
      requireAuth: false,
    });

    const fetcher = apiFactory({ method: 'POST', url, formData: true });
    const samplePayload = { lorem: 'ipsum' };
    await fetcher({ locale: 'en', postData: samplePayload });

    expect(fetchMock).toHaveBeenLastCalledWith(
      'origin/en/api/url',
      expect.objectContaining({ body: { lorem: 'ipsum' } })
    );
  });

  it('should convert string the given payload for not form-data payloads', async () => {
    const fetchMock = mockWindowFetch();
    const apiFactory = ApiMakeFactory({
      getOrigin: () => origin,
      requireAuth: false,
    });

    const fetcher = apiFactory({ method: 'POST', url });
    const samplePayload = { lorem: 'ipsum' };
    await fetcher({ locale: 'en', postData: samplePayload });
    expect(fetchMock).toHaveBeenLastCalledWith(
      'origin/en/api/url',
      expect.objectContaining({
        body: '{"lorem":"ipsum"}',
      })
    );
  });

  test('if method is POST should add postData', async () => {
    const fetchMock = mockWindowFetch();

    const apiFactory = ApiMakeFactory({
      getOrigin: () => origin,
      requireAuth: false,
    });

    const fetcher = apiFactory({ method: 'POST', url });

    const postData = { a: 1 };
    await fetcher({ locale: 'en', postData });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith('origin/en/api/url', {
      body: '{"a":1}',
      headers: { locale: 'en' },
      method: 'POST',
    });
  });

  test('if fetch response is not ok, should return response body as error', async () => {
    mockWindowFetch({ ok: false, status: 500 });

    const apiFactory = ApiMakeFactory({
      getOrigin: () => origin,
      requireAuth: false,
    });

    const fetcher = apiFactory({ method: 'GET', url });

    const response = await fetcher({ locale: 'en' });

    expect(response).toEqual(
      expect.objectContaining({
        error: expect.objectContaining({
          body: 'response.text',
          status: 500,
        }),
        ok: false,
      })
    );
  });

  it('should refresh token on 401', async () => {
    mockWindowFetch({ ok: false, status: 401 });

    const jwtTokenService = new JwtTokenStore();
    jwtTokenService.getToken = jest.fn().mockReturnValue('test-token');
    jwtTokenService.refreshToken = jest.fn().mockReturnValue(Promise.resolve({}));

    const apiFactory = ApiMakeFactory({
      getOrigin: () => origin,
      requireAuth: true,
      jwtTokenService,
    });

    const fetcher = apiFactory({ method: 'GET', url });

    await fetcher({ locale: 'en' });

    expect(jwtTokenService.refreshToken).toHaveBeenCalledTimes(1);
  });

  it('should return error when failed to parse json', async () => {
    mockWindowFetch({ json: () => Promise.reject({ message: 'failed to parse json' }) });

    const jwtTokenService = new JwtTokenStore();
    jwtTokenService.getToken = jest.fn().mockReturnValue('test-token');
    jwtTokenService.refreshToken = jest.fn().mockReturnValue(Promise.resolve({}));

    const apiFactory = ApiMakeFactory({
      getOrigin: () => origin,
      requireAuth: true,
      jwtTokenService,
    });

    const fetcher = apiFactory({ method: 'GET', url });

    const result = await fetcher({ locale: 'en' });

    expect(result).toEqual({
      error: 'failed to parse json. response.text',
      ok: false,
    });
  });

  it('should overwrite the initally given url', () => {
    const fetchMock = mockWindowFetch();
    const jwtTokenService = new JwtTokenStore();
    jwtTokenService.getToken = jest.fn().mockReturnValue('test-token');
    jwtTokenService.refreshToken = jest.fn().mockReturnValue(Promise.resolve({}));

    const apiFactory = ApiMakeFactory({
      getOrigin: () => origin,
      requireAuth: true,
      jwtTokenService,
    });

    const fetcher = apiFactory({ method: 'GET', url });
    fetcher({ url: 'last-url', locale: 'en' });

    expect(fetchMock).toHaveBeenCalledWith('origin/en/api/last-url', {
      headers: { locale: 'en', 'x-pf-jwt': 'Bearer test-token' },
      method: 'GET',
    });
  });

  it('should use response mapper on make factory level', async () => {
    mockWindowFetch();

    const dataMapperResult = { a: 1 };
    const apiFactory = ApiMakeFactory({
      getOrigin: () => origin,
      requireAuth: false,
      dataMapper: () => dataMapperResult,
    });

    const fetcher = apiFactory({ method: 'GET', url });

    const result = await fetcher({ locale: 'en' });

    expect(result).toEqual(expect.objectContaining({ data: dataMapperResult }));
  });

  it('should handle make factory level mapper error', async () => {
    mockWindowFetch();
    mockWindowConsole();

    const apiFactory = ApiMakeFactory({
      getOrigin: () => origin,
      requireAuth: false,
      dataMapper: () => {
        throw new Error('make factory data mapper error');
      },
    });

    const fetcher = apiFactory({ method: 'GET', url });

    const result = await fetcher({ locale: 'en' });

    expect(result).toEqual(
      expect.objectContaining({
        error: expect.objectContaining({
          body: 'failed to execute makeFactoryProps.dataMapper for: origin/en/api/url. make factory data mapper error',
        }),
        ok: false,
      })
    );
  });

  it('should use response mapper on factory level', async () => {
    mockWindowFetch();

    const dataMapperResult = { b: 1 };
    const apiFactory = ApiMakeFactory({
      getOrigin: () => origin,
      requireAuth: false,
    });

    const fetcher = apiFactory({ method: 'GET', url, dataMapper: () => dataMapperResult });

    const result = await fetcher({ locale: 'en' });

    expect(result).toEqual(expect.objectContaining({ data: dataMapperResult }));
  });

  it('should handle factory level mapper error', async () => {
    mockWindowFetch();
    mockWindowConsole();

    const apiFactory = ApiMakeFactory({
      getOrigin: () => origin,
      requireAuth: false,
    });

    const fetcher = apiFactory({
      method: 'GET',
      url,
      dataMapper: () => {
        throw new Error('factory data mapper error');
      },
    });

    const result = await fetcher({ locale: 'en' });

    expect(result).toEqual(
      expect.objectContaining({
        error: expect.objectContaining({
          body: 'failed to execute factoryProps.dataMapper for: origin/en/api/url. factory data mapper error',
        }),
        ok: false,
      })
    );
  });

  it('should use both dataMappers together when defined', async () => {
    mockWindowFetch({ json: () => Promise.resolve(5) });

    const apiFactory = ApiMakeFactory({
      getOrigin: () => origin,
      requireAuth: false,
      dataMapper: (n) => (n as number) + 10,
    });

    const fetcher = apiFactory({ method: 'GET', url, dataMapper: (n) => (n as number) * 100 });

    const result = await fetcher({ locale: 'en' });

    expect(result).toEqual(expect.objectContaining({ data: 1500 }));
  });
});
