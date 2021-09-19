type OnUnmount = () => void;

const original = global.React.useEffect;

const unmountCallbacks: Function[] = [];

type Props = {
  callImmediately: boolean;
};

export const mockReactUseEffect = (props?: Props): { trigger: () => void; unmountAll: OnUnmount } => {
  const { callImmediately = true } = props || {};

  let trigger: () => void;

  jest.spyOn(global.React, 'useEffect').mockImplementation((f) => {
    trigger = (): void => {
      const onUnmount = f();
      if (onUnmount) {
        unmountCallbacks.push(onUnmount);
      }
    };

    if (callImmediately) {
      trigger();
    }
  });

  return {
    trigger: (): void => trigger && trigger(),
    unmountAll: (): void => {
      unmountCallbacks.forEach((cb) => cb());
      unmountCallbacks.length = 0;
    },
  };
};

// eslint-disable-next-line pf-rules/export-name-validation
export const recoverReactUseEffect = (): void => {
  unmountCallbacks.length = 0;
  global.React.useEffect = original;
};
