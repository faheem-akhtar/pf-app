import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import { LocaleEnum } from 'services/locale/enum';
import { LocaleService } from 'services/locale/service';
import { UserContextProvider } from 'context/user/context-provider';

// TODO-FE[TPNX-3181] import desktop css for desktop, to apply corret font-family

import '../styles/index.scss';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  // Init locale service
  LocaleService.setLocale(useRouter().locale as LocaleEnum);

  return (
    <UserContextProvider>
      <Component {...pageProps} />
    </UserContextProvider>
  );
};

MyApp.getInitialProps = async (appContext: AppContext): Promise<{ pageProps: unknown }> => ({
  ...(await App.getInitialProps(appContext)),
});

export default appWithTranslation(MyApp);
