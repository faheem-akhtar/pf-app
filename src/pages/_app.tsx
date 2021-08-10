import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';

import { appWithTranslation } from 'next-i18next';

// TODO-FE[TPNX-3181] import desktop css for desktop, to apply corret font-family
import '../styles/index.scss';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return <Component {...pageProps} />;
};

MyApp.getInitialProps = async (appContext: AppContext): Promise<{ pageProps: unknown }> => ({
  ...(await App.getInitialProps(appContext)),
});

export default appWithTranslation(MyApp);
