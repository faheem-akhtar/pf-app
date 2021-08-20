import { useTranslationHook } from 'helpers/hook/translation.hook';

import styles from './property-search-not-found-section.module.scss';

export const PropertySearchNotFoundSectionTemplate = (): JSX.Element => {
  const { t } = useTranslationHook();

  return (
    <div className={styles.container}>
      <h2 className={styles.text}>{t('search/properties-not-found')}</h2>
      <div className={styles.hint}>{t('search/properties-not-fount-hint')}</div>
      <ul className={styles.options}>
        <li>{t('change-the-location')}</li>
      </ul>
    </div>
  );
};
