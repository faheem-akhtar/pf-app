import { PropertyCardMenuContentButtonTemplatePropsInterface } from './template-props.interface';

import { ButtonComponentTypeEnum } from 'library/button/component-type.enum';
import { ButtonIconPositionEnum } from 'library/button/icon-position.enum';
import { ButtonSizeEnum } from 'library/button/size.enum';
import { ButtonTemplate } from 'library/button/template';

import styles from '../property-card-menu-content.module.scss';

export const PropertyCardMenuContentButtonTemplate = ({
  icon,
  label,
  onClick,
}: PropertyCardMenuContentButtonTemplatePropsInterface): JSX.Element => (
  <ButtonTemplate
    type='button'
    className={styles.button}
    onClick={onClick}
    componentType={ButtonComponentTypeEnum.tertiary}
    size={ButtonSizeEnum.regular}
    icon={{ component: icon, position: ButtonIconPositionEnum.left }}
  >
    {label}
  </ButtonTemplate>
);
