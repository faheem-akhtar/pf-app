const originalFetch = global.fetch;

const defaultResponse = {
  ok: true,
  status: 200,
  headers: { get: (): string => '' },
  json: (): Promise<{}> => Promise.resolve({}),
  text: (): Promise<string> => Promise.resolve('response.text'),
};

export const mockFetch = (response = {}): jest.Mock => {
  response = { ...defaultResponse, ...response };

  const fetchMock = jest.fn();
  global.fetch = fetchMock.mockReturnValue({
    then: (callback: Function) => {
      return callback(response);
    },
  });

  return fetchMock;
};

// eslint-disable-next-line pf-rules/export-name-validation
export const recoverFetch = (): void => {
  global.fetch = originalFetch;
};
