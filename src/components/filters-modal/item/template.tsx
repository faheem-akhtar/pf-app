import { useTranslation } from 'next-i18next';

import { FiltersModalItemTemplatePropsInterface } from './template-props.interface';

import styles from './filters-modal-item-template.module.scss';

export const FiltersModalItemTemplate = (props: FiltersModalItemTemplatePropsInterface): JSX.Element => {
  const { t } = useTranslation();

  return (
    <section className={styles.container}>
      <div className={styles.headline}>
        {props.icon && props.icon}
        {props.label}
        {props.isNew && <div className={styles.tag}>{t('new')}</div>}
      </div>

      {props.value && <span>{props.value}</span>}
      {props.children}
    </section>
  );
};
