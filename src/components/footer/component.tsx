import { configLinksDefinition } from 'config/links/definition';
import { domClassMerge } from 'helpers/dom/class-merge';
import { featureCopyrightEnabled } from 'feature/copyright/enabled';

import { CopyrightTemplate } from 'components/copyright/template';
import { IconAppStoreTemplate } from './icon/app-store.template';
import { IconGooglePlayTemplate } from './icon/google-play.template';

import styles from './footer.module.scss';
import { useTranslationHook } from 'helpers/hook/translation.hook';

/**
 * TODO-FE[TPNX-3016] Add tests
 * TODO-FE[TPNX-3142] Add translations
 */
export const FooterComponent = (): JSX.Element => {
  const { t } = useTranslationHook();

  return (
    <footer className={styles.footer}>
      <div className={domClassMerge(styles.section, styles.categories)}>
        {configLinksDefinition.primary.map((links, index) => (
          <ul className={styles.container} key={`links-${index}`}>
            {links.map((link) => (
              <li key={link.translationKey} className={styles.item}>
                <a className={domClassMerge(styles.link, styles.primary)} href={t(link.target)}>
                  {t(link.translationKey)}
                </a>
              </li>
            ))}
          </ul>
        ))}
      </div>
      <div className={styles.section}>
        {configLinksDefinition.secondary.map((links, index) => (
          <ul className={styles.container} key={`links-${index}`}>
            {links.map((link) => (
              <li key={link.translationKey} className={styles.item}>
                <a className={domClassMerge(styles.link, styles.secondary)} href={t(link.target)}>
                  {t(link.translationKey)}
                </a>
              </li>
            ))}
          </ul>
        ))}
      </div>
      <ul className={domClassMerge(styles.section, styles.apps)}>
        <li className={domClassMerge(styles.item, styles.container)}>
          <a className={styles.downloadLink} href={configLinksDefinition.iosDownloadLink}>
            <IconAppStoreTemplate />
          </a>
        </li>
        <li className={domClassMerge(styles.item, styles.container)}>
          <a className={styles.downloadLink} href={configLinksDefinition.androidDownloadLink}>
            <IconGooglePlayTemplate />
          </a>
        </li>
      </ul>
      {featureCopyrightEnabled && <CopyrightTemplate />}
    </footer>
  );
};
