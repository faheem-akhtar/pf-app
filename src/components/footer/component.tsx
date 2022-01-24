import { CopyrightTemplate } from 'components/copyright/template';
import { copyrightEnabledByDefault } from 'config/copyright/enabled-by-default';
import { configLinksDefinition } from 'config/links/definition';
import { domClassMerge } from 'helpers/dom/class-merge';
import { useTranslation } from 'helpers/translation/hook';

import styles from './footer.module.scss';
import { IconAppStoreTemplate } from './icon/app-store.template';
import { IconGooglePlayTemplate } from './icon/google-play.template';
import { IconHuaweiStoreTemplate } from './icon/huawei-store.template';

/**
 * TODO-FE[TPNX-3016] Add tests
 */
export const FooterComponent = ({ onClickAppDownload }: { onClickAppDownload?: () => void }): JSX.Element => {
  const { t } = useTranslation();

  return (
    <footer className={styles.container}>
      <div className={domClassMerge(styles.section, styles['section--categories'])}>
        {configLinksDefinition.primary.map((links, index) => (
          <ul className={styles.list} key={`links-${index}`}>
            {links.map((link) => (
              <li key={link.translationKey} className={styles.item}>
                <a className={domClassMerge(styles.link, styles['link--primary'])} href={t(link.target)}>
                  {t(link.translationKey)}
                </a>
              </li>
            ))}
          </ul>
        ))}
      </div>
      <div className={styles.section}>
        {configLinksDefinition.secondary.map((links, index) => (
          <ul className={styles.list} key={`links-${index}`}>
            {links.map((link) => (
              <li key={link.translationKey} className={styles.item}>
                <a className={domClassMerge(styles.link, styles['link--secondary'])} href={t(link.target)}>
                  {t(link.translationKey)}
                </a>
              </li>
            ))}
          </ul>
        ))}
      </div>
      <div className={domClassMerge(styles.section, styles['section--apps'])}>
        <a
          className={styles['link--download']}
          href={t(configLinksDefinition.iosDownloadLink)}
          onClick={onClickAppDownload}
        >
          <IconAppStoreTemplate />
        </a>
        <a
          className={styles['link--download']}
          href={t(configLinksDefinition.androidDownloadLink)}
          onClick={onClickAppDownload}
        >
          <IconGooglePlayTemplate />
        </a>
        <a
          className={styles['link--download']}
          href={t(configLinksDefinition.huaweiDownloadLink)}
          onClick={onClickAppDownload}
        >
          <IconHuaweiStoreTemplate />
        </a>
      </div>
      {copyrightEnabledByDefault && <CopyrightTemplate t={t} />}
    </footer>
  );
};
