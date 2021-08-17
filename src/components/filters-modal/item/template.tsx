import { domClassMerge } from 'helpers/dom/class-merge';
import { useTranslationHook } from 'helpers/hook/translation.hook';

import { FiltersModalItemTemplatePropsInterface } from './template-props.interface';

import styles from './filters-modal-item-template.module.scss';

export const FiltersModalItemTemplate = ({
  icon,
  label,
  isNew,
  children,
  hasBorder = true,
  containerClassName,
}: FiltersModalItemTemplatePropsInterface): JSX.Element => {
  const { t } = useTranslationHook();

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
