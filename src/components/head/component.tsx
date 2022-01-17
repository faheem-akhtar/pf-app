import Head from 'next/head';
import { useRouter } from 'next/router';

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
      {alternateUrl && <link href={alternateUrl} rel='alternate' hrefLang={targetLocale} />}
      {pagePreviousUrl && <link href={pagePreviousUrl} rel='prev' />}
      {pageNextUrl && <link href={pageNextUrl} rel='next' />}
      {snowplowHost && <HeadTrackersTemplate snowplowHost={snowplowHost} />}
      {schema && <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: schema }} />}
      <link rel='icon' type='image/png' sizes='32x32' href='/en/static/favicon/32x32.png' />
      <link rel='icon' type='image/png' sizes='16x16' href='/en/static/favicon/16x16.png' />
      <link rel='manifest' href='/en/static/manifest.json' />
      <link rel='mask-icon' href='/en/static/favicon/safari-pinned-tab.svg' color='#ef5e4e' />
      {/* Do not render telephone numbers as links */}
      <meta name='format-detection' content='telephone=no' />
      <meta name='robots' content={`${shouldIndex ? '' : 'no'}index,follow`} />
      <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0' />
      <meta name='msapplication-TileColor' content='#ffffff' />
    </Head>
  );
};
