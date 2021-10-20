import { NextApiRequest, NextApiResponse } from 'next';

import { mockWindowConsole } from 'mocks/window/console.mock';
import { nextApiRequestStub, nextApiResponseStub } from 'stubs/next/api';

import * as backendApiSaveSearchFetcherModule from 'backend/api/save-search/fetcher';
import pagesApiPwaSavedSearch from 'pages/api/pwa/saved-search';

jest.mock('backend/api/save-search/fetcher');

describe('pagesApiPwaSavedSearch', () => {
  let reqMock: NextApiRequest;
  let resMock: NextApiResponse;

  beforeEach(() => {
    reqMock = nextApiRequestStub();
    resMock = nextApiResponseStub();

    (backendApiSaveSearchFetcherModule.backendApiSaveSearchFetcher as jest.Mock).mockReset();
  });

  it('should call backend api', async () => {
    const factoryMock = jest.fn().mockReturnValue(Promise.resolve({ ok: true }));
    (backendApiSaveSearchFetcherModule.backendApiSaveSearchFetcher as jest.Mock).mockReturnValue(factoryMock);

    reqMock.method = 'GET';
    reqMock.query = {};

    await pagesApiPwaSavedSearch(reqMock, resMock);

    expect(backendApiSaveSearchFetcherModule.backendApiSaveSearchFetcher).toHaveBeenCalledTimes(1);
    expect(backendApiSaveSearchFetcherModule.backendApiSaveSearchFetcher).toHaveBeenCalledWith('GET');

    expect(factoryMock).toHaveBeenCalledTimes(1);
    expect(factoryMock).toHaveBeenCalledWith({
      locale: 'en',
      alterHeaders: expect.any(Function),
      getOrigin: expect.any(Function),
      query: {},
      postData: undefined,
    });
  });

  it('should send custom headers', async () => {
    const headers = {} as Headers;
    const factoryMock = jest.fn().mockReturnValue(Promise.resolve({ ok: true }));
    (backendApiSaveSearchFetcherModule.backendApiSaveSearchFetcher as jest.Mock).mockReturnValue(factoryMock);

    reqMock.method = 'GET';
    reqMock.headers['x-pf-jwt'] = 'jwt-token';

    await pagesApiPwaSavedSearch(reqMock, resMock);

    factoryMock.mock.calls[0][0].alterHeaders(headers);
    expect(headers).toEqual({ 'content-type': 'application/vnd.api+json', 'x-pf-jwt': 'jwt-token' });
  });

  it('should send back the data', async () => {
    const dataMock = {
      data: {
        id: '1',
        type: 'abc',
      },
    };
    const factoryMock = jest.fn().mockReturnValue(Promise.resolve({ ok: true, data: dataMock }));
    (backendApiSaveSearchFetcherModule.backendApiSaveSearchFetcher as jest.Mock).mockReturnValue(factoryMock);

    reqMock.method = 'GET';
    await pagesApiPwaSavedSearch(reqMock, resMock);

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
    (backendApiSaveSearchFetcherModule.backendApiSaveSearchFetcher as jest.Mock).mockReturnValue(factoryMock);

    reqMock.method = 'GET';
    await pagesApiPwaSavedSearch(reqMock, resMock);

    expect(resMock.send).not.toHaveBeenCalled();

    expect(resMock.status).toHaveBeenCalledTimes(1);
    expect(resMock.status).toHaveBeenCalledWith(500);

    expect(resMock.end).toHaveBeenCalledTimes(1);
    expect(resMock.end).toHaveBeenCalledWith();

    expect(consoleMock.error).toHaveBeenCalledTimes(1);
    expect((consoleMock.error as jest.Mock).mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          "save search api failed",
          Object {
            "body": "this is an error",
            "status": 500,
          },
        ],
      ]
    `);
  });

  it('can accept post data', async () => {
    const factoryMock = jest.fn().mockReturnValue(Promise.resolve({ ok: true }));
    (backendApiSaveSearchFetcherModule.backendApiSaveSearchFetcher as jest.Mock).mockReturnValue(factoryMock);

    reqMock.method = 'POST';
    reqMock.query = {};
    reqMock.body = '{ "a": 1, "b": 2 }';

    await pagesApiPwaSavedSearch(reqMock, resMock);

    expect(backendApiSaveSearchFetcherModule.backendApiSaveSearchFetcher).toHaveBeenCalledTimes(1);
    expect(backendApiSaveSearchFetcherModule.backendApiSaveSearchFetcher).toHaveBeenCalledWith('POST');

    expect(factoryMock).toHaveBeenCalledTimes(1);
    expect(factoryMock).toHaveBeenCalledWith({
      locale: 'en',
      alterHeaders: expect.any(Function),
      getOrigin: expect.any(Function),
      query: {},
      postData: { a: 1, b: 2 },
    });
  });
});
