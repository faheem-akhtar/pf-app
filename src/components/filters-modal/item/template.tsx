import { domClassMerge } from 'helpers/dom/class-merge';
import { useTranslation } from 'helpers/translation/hook';

import styles from './filters-modal-item-template.module.scss';
import { FiltersModalItemTemplatePropsInterface } from './template-props.interface';

export const FiltersModalItemTemplate = ({
  icon,
  label,
  isNew,
  children,
  hasBorder = true,
  containerClassName,
}: FiltersModalItemTemplatePropsInterface): JSX.Element => {
  const { t } = useTranslation();

  return (
    <section
      className={domClassMerge(
        { [styles.container]: hasBorder, [styles.containerWithIcon]: icon && hasBorder },
        containerClassName
      )}
    >
      {icon && label && (
        <div className={styles.headline}>
          {icon}
          {label}
          {isNew && <div className={styles.tag}>{t('new')}</div>}
        </div>
      )}

      {children}
    </section>
  );
};
