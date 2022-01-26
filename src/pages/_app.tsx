import 'intersection-observer';
// TODO-FE[TPNX-3181] import desktop css for desktop, to apply corret font-family
import '../styles/index.scss';
import type { AppContext, AppProps, NextWebVitalsMetric } from 'next/app';
// eslint-disable-next-line no-duplicate-imports
import App from 'next/app';
import { useRouter } from 'next/router';
// eslint-disable-next-line @propertyfinder/rules/forbid-import
import { appWithTranslation } from 'next-i18next';
import { useEffect } from 'react';
import { APP_ROOT_ELEMENT_ID } from 'src/constants/app/root-element-id.constant';

import { UserContextProvider } from 'components/user/context-provider';
import { BrowserLoggerService } from 'services/browser-logger/service';
import { LocaleEnum } from 'services/locale/enum';
import { LocaleService } from 'services/locale/service';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  const { locale } = useRouter();

  useEffect(() => {
    BrowserLoggerService().initialize();
    // Init locale service
    LocaleService.setLocale(locale as LocaleEnum);
    document.documentElement.dir = locale === LocaleEnum.ar ? 'rtl' : 'ltr';
  }, [locale]);

  return (
    <UserContextProvider>
      <div id={APP_ROOT_ELEMENT_ID}>
        <Component {...pageProps} />
      </div>
    </UserContextProvider>
  );
};

// eslint-disable-next-line @propertyfinder/rules/export-name-validation
export function reportWebVitals(metric: NextWebVitalsMetric): void {
  // eslint-disable-next-line no-console
  console.log(`CWV-${metric.name.replace('Next.js-', '')}:${Math.round(metric.value)}:${Math.round(metric.startTime)}`);
}

MyApp.getInitialProps = async (appContext: AppContext): Promise<{ pageProps: unknown }> => ({
  ...(await App.getInitialProps(appContext)),
});

export default appWithTranslation(MyApp);
