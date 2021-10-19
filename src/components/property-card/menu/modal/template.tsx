import { FunctionComponent } from 'react';

import { ButtonComponentTypeEnum } from 'library/button/component-type.enum';
import { ButtonSizeEnum } from 'library/button/size.enum';
import { ButtonTemplate } from 'library/button/template';

import styles from './property-card-menu-modal.module.scss';
import { PropertyCardMenuModalTemplatePropsBaseInterface } from './template-props-base.interface';

export const PropertyCardMenuModalTemplate: FunctionComponent<PropertyCardMenuModalTemplatePropsBaseInterface> = ({
  closeButtonLabel,
  onCloseButtonClick,
  children,
}): JSX.Element => (
  <div
    data-testid='property-card-menu-modal'
    className={styles.container}
    onClick={(e): void => {
      // Property card click was being triggered when clicking inside this template
      e.stopPropagation();
    }}
  >
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
);
