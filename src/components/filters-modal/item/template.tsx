import { domClassMerge } from 'helpers/dom/class-merge';
import { useTranslation } from 'helpers/translation/hook';
import { TagTemplate } from 'library/tag/template';

import styles from './filters-modal-item-template.module.scss';
import { FiltersModalItemTemplatePropsInterface } from './template-props.interface';

export const FiltersModalItemTemplate = ({
  icon,
  label,
  isNew,
  children,
  hasBorder = true,
  visible = true,
  containerClassName,
}: FiltersModalItemTemplatePropsInterface): JSX.Element => {
  const { t } = useTranslation();

  return (
    <section
      className={domClassMerge(
        {
          [styles.container]: hasBorder,
          [styles.containerWithIcon]: icon && hasBorder,
          [styles.containerHidden]: !visible,
        },
        containerClassName
      )}
    >
      {icon && label && (
        <div className={styles.headline}>
          {icon}
          {label}
          {isNew && <TagTemplate>{t('new')}</TagTemplate>}
        </div>
      )}

      {children}
    </section>
  );
};
