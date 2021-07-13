import { CopyrightTemplate } from 'components/copyright/template';
import { FunctionalComponent } from 'preact';
import { IconAppStoreTemplate } from './icon/app-store.template';
import { IconGooglePlayTemplate } from './icon/google-play.template';
import { configLinksDefinition } from 'config/links/definition';
import { domClassMerge } from 'helpers/dom/class-merge';
import { featureCopyrightEnabled } from 'feature/copyright/enabled';
import styles from './footer.module.scss';
import { useTranslation } from 'react-i18next';

// TODO-FE[TPNX-3009] Add tests
export const FooterComponent: FunctionalComponent = () => {
  const { t } = useTranslation('common');

  return (
    <footer className={styles.footer}>
      <ul className={domClassMerge(styles.section, styles.categories)}>
        {configLinksDefinition.primary.map((link) => (
          <li className={styles.item} key={link.translationKey}>
            <a className={domClassMerge(styles.link, styles.primary)} href={link.urlPath}>
              {t(link.translationKey)}
            </a>
          </li>
        ))}
      </ul>
      <ul className={styles.section}>
        {configLinksDefinition.secondary.map((link) => (
          <li className={styles.item} key={link.translationKey}>
            <a className={domClassMerge(styles.link, styles.secondary)} href={link.urlPath}>
              {t(link.translationKey)}
            </a>
          </li>
        ))}
      </ul>
      <ul className={domClassMerge(styles.section, styles.apps)}>
        <li className={styles.item}>
          <a className={styles.downloadLink} href={configLinksDefinition.iosDownloadLink}>
            <IconAppStoreTemplate />
          </a>
        </li>
        <li className={styles.item}>
          <a className={styles.downloadLink} href={configLinksDefinition.androidDownloadLink}>
            <IconGooglePlayTemplate />
          </a>
        </li>
      </ul>
      {featureCopyrightEnabled && <CopyrightTemplate />}
    </footer>
  );
};
