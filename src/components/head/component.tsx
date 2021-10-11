import Head from 'next/head';

import { HeadComponentPropsInterface } from './component-props.interface';
import { HeadTrackersTemplate } from './trackers-template';

export const HeadComponent = ({ pageTitle, shouldIndex = true }: HeadComponentPropsInterface): JSX.Element => {
  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link rel='icon' type='image/png' sizes='32x32' href='static/favicon/32x32.png' />
      <link rel='icon' type='image/png' sizes='16x16' href='static/favicon/16x16.png' />
      <link rel='manifest' href='/en/static/manifest.json' />
      <link rel='mask-icon' href='/en/static/favicon/safari-pinned-tab.svg' color='#ef5e4e' />
      {/* Do not render telephone numbers as links */}
      <meta name='format-detection' content='telephone=no' />
      <meta name='robots' content={`${shouldIndex ? '' : 'no'}index,follow`} />
      <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0' />
      <meta name='msapplication-TileColor' content='#ffffff' />
      <meta name='theme-color' content='#ffffff' />
      <HeadTrackersTemplate />
    </Head>
  );
};
