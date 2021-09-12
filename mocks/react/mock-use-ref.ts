const original = global.React.useRef;

const unmountCallbacks: Function[] = [];

export const mockReactUseRef = <T>(initialValue?: T): React.MutableRefObject<T> => {
  const mock = { current: initialValue } as React.MutableRefObject<T>;
  const mockImpl: any = (initial: T) => {
    if (initialValue === undefined) {
      mock.current = initial;
    }
    return mock;
  };

  jest.spyOn(global.React, 'useRef').mockImplementation(mockImpl);
  return mock;
};

// eslint-disable-next-line pf-rules/export-name-validation
export const recoverReactUseRef = (): void => {
  unmountCallbacks.length = 0;
  global.React.useRef = original;
};
