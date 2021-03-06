const originalFetch = global.fetch;

const defaultResponse = {
  ok: true,
  status: 200,
  headers: { get: (): string => '' },
  json: (): Promise<{}> => Promise.resolve({}),
  text: (): Promise<string> => Promise.resolve('response.text'),
};

export const mockWindowFetch = (response = {}): jest.Mock => {
  response = { ...defaultResponse, ...response };

  const fetchMock = jest.fn();
  global.fetch = fetchMock.mockReturnValue({
    then: (callback: Function) => {
      return callback(response);
    },
  });

  return fetchMock;
};

// eslint-disable-next-line @propertyfinder/rules/export-name-validation
export const recoverWindowFetch = (): void => {
  global.fetch = originalFetch;
};
