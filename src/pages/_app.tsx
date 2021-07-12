import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import { appWithTranslation } from 'next-i18next';
import '../styles/index.scss';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => <Component {...pageProps} />;

MyApp.getInitialProps = async (appContext: AppContext): Promise<{ pageProps: unknown }> => ({
  ...(await App.getInitialProps(appContext)),
});

export default appWithTranslation(MyApp);
