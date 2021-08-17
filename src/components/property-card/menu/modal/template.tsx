import { ButtonComponentTypeEnum } from 'library/button/component-type.enum';
import { ButtonSizeEnum } from 'library/button/size.enum';
import { ButtonTemplate } from 'library/button/template';

import { PropertyCardMenuModalTemplatePropsBaseInterface } from './template-props-base.interface';

import styles from './property-card-menu-modal.module.scss';

export const PropertyCardMenuModalTemplate = ({
  children,
  closeButtonLabel,
  onCloseButtonClick,
  onOverlayClick,
}: PropertyCardMenuModalTemplatePropsBaseInterface): JSX.Element => (
  <div
    className={styles.container}
    // Property card click was being triggered when clicking inside this template
    onClick={(e): void => {
      e.preventDefault();
      e.stopPropagation();
    }}
  >
    <button type='button' className={styles.overlay} onClick={onOverlayClick} />
    <div className={styles.content}>
      {children}

      <ButtonTemplate
        type='button'
        size={ButtonSizeEnum.regular}
        componentType={ButtonComponentTypeEnum.tertiary}
        onClick={onCloseButtonClick}
        className={styles.closeButton}
      >
        {closeButtonLabel}
      </ButtonTemplate>
    </div>
  </div>
);
