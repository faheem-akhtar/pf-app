import { NextApiRequest, NextApiResponse } from 'next';

import { mockWindowConsole } from 'mocks/window/console.mock';
import { nextApiRequestStub, nextApiResponseStub } from 'stubs/next/api';

import * as backendApiContactedPropertyFetcherModule from 'backend/api/contacted-property/fetcher';
import pagesApiPwaContactedProperty from 'pages/api/pwa/contacted-property';

jest.mock('backend/api/contacted-property/fetcher');

describe('pagesApiPwaContactedProperty', () => {
  let reqMock: NextApiRequest;
  let resMock: NextApiResponse;

  beforeEach(() => {
    reqMock = nextApiRequestStub();
    resMock = nextApiResponseStub();

    (backendApiContactedPropertyFetcherModule.backendApiContactedPropertyFetcher as jest.Mock).mockReset();
  });

  it('should call backend api', async () => {
    const factoryMock = jest.fn().mockReturnValue(Promise.resolve({ ok: true }));
    (backendApiContactedPropertyFetcherModule.backendApiContactedPropertyFetcher as jest.Mock).mockReturnValue(
      factoryMock
    );

    reqMock.method = 'GET';
    reqMock.query = {};

    await pagesApiPwaContactedProperty(reqMock, resMock);

    expect(backendApiContactedPropertyFetcherModule.backendApiContactedPropertyFetcher).toHaveBeenCalledTimes(1);
    expect(backendApiContactedPropertyFetcherModule.backendApiContactedPropertyFetcher).toHaveBeenCalledWith('GET');

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
    (backendApiContactedPropertyFetcherModule.backendApiContactedPropertyFetcher as jest.Mock).mockReturnValue(
      factoryMock
    );

    reqMock.method = 'GET';
    reqMock.headers['x-pf-jwt'] = 'jwt-token';

    await pagesApiPwaContactedProperty(reqMock, resMock);

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
    (backendApiContactedPropertyFetcherModule.backendApiContactedPropertyFetcher as jest.Mock).mockReturnValue(
      factoryMock
    );

    reqMock.method = 'GET';
    await pagesApiPwaContactedProperty(reqMock, resMock);

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
    (backendApiContactedPropertyFetcherModule.backendApiContactedPropertyFetcher as jest.Mock).mockReturnValue(
      factoryMock
    );

    reqMock.method = 'GET';
    await pagesApiPwaContactedProperty(reqMock, resMock);

    expect(resMock.send).not.toHaveBeenCalled();

    expect(resMock.status).toHaveBeenCalledTimes(1);
    expect(resMock.status).toHaveBeenCalledWith(500);

    expect(resMock.end).toHaveBeenCalledTimes(1);
    expect(resMock.end).toHaveBeenCalledWith();

    expect(consoleMock.error).toHaveBeenCalledTimes(1);
    expect((consoleMock.error as jest.Mock).mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          "API_FAILED:CONTACTED_PROPERTY:this is an error",
        ],
      ]
    `);
  });

  it('can accept post data', async () => {
    const factoryMock = jest.fn().mockReturnValue(Promise.resolve({ ok: true }));
    (backendApiContactedPropertyFetcherModule.backendApiContactedPropertyFetcher as jest.Mock).mockReturnValue(
      factoryMock
    );

    reqMock.method = 'POST';
    reqMock.query = {};
    reqMock.body = '{ "a": 1, "b": 2 }';

    await pagesApiPwaContactedProperty(reqMock, resMock);

    expect(backendApiContactedPropertyFetcherModule.backendApiContactedPropertyFetcher).toHaveBeenCalledTimes(1);
    expect(backendApiContactedPropertyFetcherModule.backendApiContactedPropertyFetcher).toHaveBeenCalledWith('POST');

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
