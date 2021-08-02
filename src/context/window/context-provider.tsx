import { WindowContext } from './context';
import { windowLocalStorageMakeWrapper } from './local-storage/make-wrapper';

export const WindowContextProvider = ({
  window,
  children,
}: React.PropsWithChildren<{ window: Window }>): JSX.Element => {
  const value = {
    localStorage: windowLocalStorageMakeWrapper(window),
  };

  return <WindowContext.Provider value={value}>{children}</WindowContext.Provider>;
};
