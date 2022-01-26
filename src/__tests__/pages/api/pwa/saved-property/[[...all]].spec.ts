/* eslint @propertyfinder/rules/export-name-validation: 0 */

import { NextApiRequest, NextApiResponse } from 'next';

import { mockWindowConsole } from 'mocks/window/console.mock';
import { nextApiRequestStub, nextApiResponseStub } from 'stubs/next/api';

import * as backendApiSavedPropertyFetcherModule from 'backend/api/saved-property/fetcher';
import pagesApiPwaSavedPropertyAll from 'pages/api/pwa/saved-property/[[...all]]';

jest.mock('backend/api/saved-property/fetcher');

describe('pagesApiPwaSavedPropertyAll', () => {
  let reqMock: NextApiRequest;
  let resMock: NextApiResponse;

  beforeEach(() => {
    reqMock = nextApiRequestStub();
    resMock = nextApiResponseStub();

    (backendApiSavedPropertyFetcherModule.backendApiSavedPropertyFetcher as jest.Mock).mockReset();
  });

  it('should call backend api', async () => {
    const factoryMock = jest.fn().mockReturnValue(Promise.resolve({ ok: true }));
    (backendApiSavedPropertyFetcherModule.backendApiSavedPropertyFetcher as jest.Mock).mockReturnValue(factoryMock);

    reqMock.method = 'GET';
    reqMock.query = {};

    await pagesApiPwaSavedPropertyAll(reqMock, resMock);

    expect(backendApiSavedPropertyFetcherModule.backendApiSavedPropertyFetcher).toHaveBeenCalledTimes(1);
    expect(backendApiSavedPropertyFetcherModule.backendApiSavedPropertyFetcher).toHaveBeenCalledWith('GET');

    expect(factoryMock).toHaveBeenCalledTimes(1);
    expect(factoryMock).toHaveBeenCalledWith({
      locale: 'en',
      alterHeaders: expect.any(Function),
      getOrigin: expect.any(Function),
      query: {},
      postData: undefined,
      reloadCache: true,
    });
  });

  it('should send custom headers', async () => {
    const headers = {} as Headers;
    const factoryMock = jest.fn().mockReturnValue(Promise.resolve({ ok: true }));
    (backendApiSavedPropertyFetcherModule.backendApiSavedPropertyFetcher as jest.Mock).mockReturnValue(factoryMock);

    reqMock.method = 'GET';
    reqMock.headers['x-pf-jwt'] = 'jwt-token';

    await pagesApiPwaSavedPropertyAll(reqMock, resMock);

    factoryMock.mock.calls[0][0].alterHeaders(headers);
    expect(headers).toEqual({
      'content-type': 'application/vnd.api+json',
      'x-pf-jwt': 'jwt-token',
      'cache-control': 'no-cache, no-store, max-age=0, must-revalidate',
    });
  });

  it('should send back the data', async () => {
    const dataMock = {
      data: {
        id: '1',
        type: 'abc',
      },
    };
    const factoryMock = jest.fn().mockReturnValue(Promise.resolve({ ok: true, data: dataMock }));
    (backendApiSavedPropertyFetcherModule.backendApiSavedPropertyFetcher as jest.Mock).mockReturnValue(factoryMock);

    reqMock.method = 'GET';
    await pagesApiPwaSavedPropertyAll(reqMock, resMock);

    expect(resMock.send).toHaveBeenCalledTimes(1);
    expect(resMock.send).toHaveBeenCalledWith(dataMock);
  });

  it('should send 500 on error', async () => {
    const consoleMock = mockWindowConsole();
    const factoryMock = jest.fn().mockReturnValue(
      Promise.resolve({
        ok: false,
        error: {
          status: 500,
          body: 'this is an error',
        },
      })
    );
    (backendApiSavedPropertyFetcherModule.backendApiSavedPropertyFetcher as jest.Mock).mockReturnValue(factoryMock);

    reqMock.method = 'GET';
    await pagesApiPwaSavedPropertyAll(reqMock, resMock);

    expect(resMock.send).not.toHaveBeenCalled();

    expect(resMock.status).toHaveBeenCalledTimes(1);
    expect(resMock.status).toHaveBeenCalledWith(500);

    expect(resMock.end).toHaveBeenCalledTimes(1);
    expect(resMock.end).toHaveBeenCalledWith();

    expect(consoleMock.error).toHaveBeenCalledTimes(1);
    expect((consoleMock.error as jest.Mock).mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          "API_FAILED:SAVED_PROPERTY:this is an error",
        ],
      ]
    `);
  });

  it('can accept post data', async () => {
    const factoryMock = jest.fn().mockReturnValue(Promise.resolve({ ok: true }));
    (backendApiSavedPropertyFetcherModule.backendApiSavedPropertyFetcher as jest.Mock).mockReturnValue(factoryMock);

    reqMock.method = 'POST';
    reqMock.query = {};
    reqMock.body = '{ "a": 1, "b": 2 }';

    await pagesApiPwaSavedPropertyAll(reqMock, resMock);

    expect(backendApiSavedPropertyFetcherModule.backendApiSavedPropertyFetcher).toHaveBeenCalledTimes(1);
    expect(backendApiSavedPropertyFetcherModule.backendApiSavedPropertyFetcher).toHaveBeenCalledWith('POST');

    expect(factoryMock).toHaveBeenCalledTimes(1);
    expect(factoryMock).toHaveBeenCalledWith({
      locale: 'en',
      alterHeaders: expect.any(Function),
      getOrigin: expect.any(Function),
      query: {},
      postData: { a: 1, b: 2 },
      reloadCache: true,
    });
  });

  it('can accept delete request', async () => {
    const factoryMock = jest.fn().mockReturnValue(Promise.resolve({ ok: true }));
    (backendApiSavedPropertyFetcherModule.backendApiSavedPropertyFetcher as jest.Mock).mockReturnValue(factoryMock);

    reqMock.method = 'DELETE';

    await pagesApiPwaSavedPropertyAll(reqMock, resMock);

    expect(backendApiSavedPropertyFetcherModule.backendApiSavedPropertyFetcher).toHaveBeenCalledTimes(1);
    expect(backendApiSavedPropertyFetcherModule.backendApiSavedPropertyFetcher).toHaveBeenCalledWith('DELETE');

    expect(factoryMock).toHaveBeenCalledTimes(1);
    expect(factoryMock).toHaveBeenCalledWith({
      locale: 'en',
      alterHeaders: expect.any(Function),
      getOrigin: expect.any(Function),
      query: {},
      reloadCache: true,
    });
  });
});
