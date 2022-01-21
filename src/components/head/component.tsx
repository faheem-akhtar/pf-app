import Head from 'next/head';
import { useRouter } from 'next/router';

import { appleItunesAppEnabledByDefault } from 'config/apple-itunes-app/enabled-by-default';
import { configCommon } from 'config/common';
import { localeIsDefault } from 'helpers/locale/is-default';

import { HeadComponentPropsInterface } from './component-props.interface';
import { HeadTrackersTemplate } from './trackers-template';

export const HeadComponent = ({
  title,
  description,
  schema,
  shouldIndex = true,
  snowplowHost,
  pageUrl,
  alternateUrl,
  pageNextUrl,
  pagePreviousUrl,
}: HeadComponentPropsInterface): JSX.Element => {
  const { locale } = useRouter();
  const { current, alternative } = configCommon.language;
  const targetLocale = localeIsDefault(locale as string) ? alternative : current;

  return (
    <Head>
      <title>{title}</title>
      <meta property='og:title' content={title} />
      {description && (
        <>
          <meta name='description' content={description} />
          <meta property='og:description' content={description} />
        </>
      )}
      {pageUrl && (
        <>
          <link href={pageUrl} rel='canonical' />
          <link href={pageUrl} rel='alternate' hrefLang={locale} />
          <meta property='og:url' content={pageUrl} />
        </>
      )}
      <meta property='og:type' content='website' />
      <meta property='og:site_name' content='Property Finder' />
      {alternateUrl && <link href={alternateUrl} rel='alternate' hrefLang={targetLocale} />}
      {pagePreviousUrl && <link href={pagePreviousUrl} rel='prev' />}
      {pageNextUrl && <link href={pageNextUrl} rel='next' />}

      <link rel='icon' type='image/png' sizes='16x16' href='/en/static/favicon/favicon-16x16.png' />
      <link rel='icon' type='image/png' sizes='32x32' href='/en/static/favicon/favicon-32x32.png' />
      <link rel='shortcut icon' type='image/x-icon' sizes='16x16 32x32 48x48' href='/en/static/favicon/favicon.ico' />
      <link rel='icon' type='image/png' sizes='192x192' href='/en/static/favicon/android-icon-192x192.png' />
      <link rel='apple-touch-icon' href='/en/static/favicon/apple-icon-76x76.png' />
      <link rel='apple-touch-icon' sizes='76x76' href='/en/static/favicon/apple-icon-76x76.png' />
      <link rel='apple-touch-icon' sizes='120x120' href='/en/static/favicon/apple-icon-120x120.png' />
      <link rel='apple-touch-icon' sizes='152x152' href='/en/static/favicon/apple-icon-152x152.png' />
      <link rel='apple-touch-icon' sizes='180x180' href='/en/static/favicon/apple-icon-180x180.png' />
      <meta name='msapplication-TileColor' content='#ffffff' />
      <meta name='msapplication-TileImage' content='/en/static/favicon/ms-icon-144x144.png' />
      <meta name='msapplication-config' content='/en/static/favicon/browserconfig.xml' />
      <meta name='msapplication-tap-highlight' content='no' />
      <meta name='theme-color' content='#ffffff' />
      <link rel='mask-icon' href='/en/static/favicon/safari-pinned-tab.svg' color='#ef5e4e' />
      <link rel='manifest' href='/en/static/site.webmanifest' />
      <meta charSet='utf-8' />
      <meta name='google' content='notranslate' />
      <meta name='locale' content={locale} />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='robots' content={`${shouldIndex ? '' : 'no'}index,follow`} />
      <meta name='application-name' content='Property Finder' />
      <meta name='mobile-web-app-capable' content='yes' />
      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta name='apple-mobile-web-app-title' content='Property Finder' />
      <meta name='apple-mobile-web-app-status-bar-style' content='default' />
      {/* Do not render telephone numbers as links */}
      <meta name='format-detection' content='telephone=no' />
      {appleItunesAppEnabledByDefault && (
        <meta name='apple-itunes-app' content='app-id=897540233, affiliate-data=pt=94765875&amp;ct=smart_app_banner' />
      )}
      {schema && <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: schema }} />}
      {snowplowHost && <HeadTrackersTemplate snowplowHost={snowplowHost} />}
    </Head>
  );
};
