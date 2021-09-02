import 'intersection-observer';

// eslint-disable-next-line pf-rules/forbid-import
import { appWithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import type { AppContext, AppProps, NextWebVitalsMetric } from 'next/app';
import App from 'next/app';

import { useEffect } from 'react';

import { LocaleEnum } from 'services/locale/enum';
import { LocaleService } from 'services/locale/service';
import { UserContextProvider } from 'context/user/context-provider';

// TODO-FE[TPNX-3181] import desktop css for desktop, to apply corret font-family

import '../styles/index.scss';
import { appRootElementId } from 'src/constants/app/root-element-id';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  const { locale } = useRouter();

  useEffect(() => {
    // Init locale service
    LocaleService.setLocale(locale as LocaleEnum);
    document.documentElement.dir = locale === LocaleEnum.ar ? 'rtl' : 'ltr';
  }, [locale]);

  return (
    <UserContextProvider>
      <div id={appRootElementId}>
        <Component {...pageProps} />
      </div>
    </UserContextProvider>
  );
};

// eslint-disable-next-line pf-rules/export-name-validation
export function reportWebVitals(metric: NextWebVitalsMetric): void {
  // eslint-disable-next-line no-console
  console.log(`CWV-${metric.name.replace('Next.js-', '')}:${Math.round(metric.value)}:${Math.round(metric.startTime)}`);
}

MyApp.getInitialProps = async (appContext: AppContext): Promise<{ pageProps: unknown }> => ({
  ...(await App.getInitialProps(appContext)),
});

export default appWithTranslation(MyApp);
