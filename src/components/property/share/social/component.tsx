import { Fragment } from 'react';

import { domClassMerge } from 'helpers/dom/class-merge';

import { IconShareEmailTemplate } from 'components/icon/share/email-template';
import { IconShareFacebookTemplate } from 'components/icon/share/facebook-template';
import { IconShareTwitterTemplate } from 'components/icon/share/twitter-template';
import { IconShareWhatsappTemplate } from 'components/icon/share/whatsapp-template';

import { PropertyShareSocialComponentPropsInterface } from './component-props.interface';
import styles from '../property-share.module.scss';

const socialGetShareLinkUtmPlatform = (url: string, platform: string): string =>
  `${url}?utm_source=${platform}&utm_medium=social&utm_campaign=share_property`;

// TODO-FE[CX-366] implement GA
export const PropertyShareSocialComponent = ({
  propertyUrl,
  t,
  onClickEmail,
}: PropertyShareSocialComponentPropsInterface): JSX.Element => {
  return (
    <Fragment>
      <div className={styles.header}>{t('social-share/title')}</div>
      <div className={styles.content}>
        <a
          className={styles.link}
          href={`https://www.facebook.com/sharer/sharer.php?u=${socialGetShareLinkUtmPlatform(
            propertyUrl,
            'facebook'
          )}`}
          target='_blank'
          rel='noreferrer'
        >
          <IconShareFacebookTemplate class={domClassMerge(styles.icon, styles.facebook)} />
        </a>
        <a
          className={styles.link}
          href={`whatsapp://send?text=${socialGetShareLinkUtmPlatform(propertyUrl, 'whatsapp')}`}
          data-action='share/whatsapp/share'
          target='_blank'
          rel='noreferrer'
        >
          <IconShareWhatsappTemplate class={domClassMerge(styles.icon, styles.whatsapp)} />
        </a>
        <div className={styles.link} onClick={onClickEmail}>
          <IconShareEmailTemplate class={domClassMerge(styles.icon, styles.email)} />
        </div>
        <a
          className={styles.link}
          href={`https://twitter.com/intent/tweet?url=${socialGetShareLinkUtmPlatform(propertyUrl, 'twitter')}`}
          target='_blank'
          rel='noreferrer'
        >
          <IconShareTwitterTemplate class={domClassMerge(styles.icon, styles.twitter)} />
        </a>
      </div>
    </Fragment>
  );
};
