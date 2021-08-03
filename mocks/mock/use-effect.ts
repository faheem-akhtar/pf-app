type OnUnmount = () => void;

const original = global.React.useEffect;

const unmountCallbacks: Function[] = [];

export const mockUseEffect = (): { unmountAll: OnUnmount } => {
  jest.spyOn(global.React, 'useEffect').mockImplementation((f) => {
    const onUnmount = f();
    if (onUnmount) {
      unmountCallbacks.push(onUnmount);
    }
  });

  return {
    unmountAll: (): void => {
      unmountCallbacks.forEach((cb) => cb());
      unmountCallbacks.length = 0;
    },
  };
};

// eslint-disable-next-line pf-rules/export-name-validation
export const recoverUseEffect = (): void => {
  unmountCallbacks.length = 0;
  global.React.useEffect = original;
};
