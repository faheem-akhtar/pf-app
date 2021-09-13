import { domClassMerge } from 'helpers/dom/class-merge';
import { ButtonComponentTypeEnum } from 'library/button/component-type.enum';
import { ButtonIconPositionEnum } from 'library/button/icon-position.enum';
import { ButtonSizeEnum } from 'library/button/size.enum';
import { ButtonTemplate } from 'library/button/template';

import styles from '../property-card-menu-content.module.scss';
import { PropertyCardMenuContentButtonTemplatePropsInterface } from './template-props.interface';

export const PropertyCardMenuContentButtonTemplate = ({
  icon,
  label,
  onClick,
  className,
}: PropertyCardMenuContentButtonTemplatePropsInterface): JSX.Element => (
  <ButtonTemplate
    type='button'
    className={domClassMerge(styles.button, className)}
    onClick={onClick}
    componentType={ButtonComponentTypeEnum.tertiary}
    size={ButtonSizeEnum.regular}
    icon={icon ? { component: icon, position: ButtonIconPositionEnum.left } : undefined}
  >
    {label}
  </ButtonTemplate>
);
