import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';

import { appWithTranslation } from 'next-i18next';

import { WindowContextProvider } from 'context/window/context-provider';

import '../styles/index.scss';
import { helpersIsClient } from 'helpers/is-client';
import { windowDefaultState } from 'context/window/default-state';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <WindowContextProvider window={helpersIsClient ? window : (windowDefaultState as Window)}>
      <Component {...pageProps} />
    </WindowContextProvider>
  );
};

MyApp.getInitialProps = async (appContext: AppContext): Promise<{ pageProps: unknown }> => ({
  ...(await App.getInitialProps(appContext)),
});

export default appWithTranslation(MyApp);
