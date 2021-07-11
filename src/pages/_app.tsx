import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import { appWithTranslation } from 'next-i18next';

const MyApp = ({ Component, pageProps }: AppProps) => <Component {...pageProps} />;

MyApp.getInitialProps = async (appContext: AppContext) => ({ ...(await App.getInitialProps(appContext)) });

export default appWithTranslation(MyApp);
