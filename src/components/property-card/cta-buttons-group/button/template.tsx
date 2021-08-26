import { ButtonComponentTypeEnum } from 'library/button/component-type.enum';
import { ButtonIconPositionEnum } from 'library/button/icon-position.enum';
import { ButtonSizeEnum } from 'library/button/size.enum';
import { ButtonTemplate } from 'library/button/template';
import { PropertyCardCtaButtonsGroupButtonTemplatePropsInterface } from './template-props.interface';

import styles from '../property-cta-buttons.module.scss';

export const PropertyCardCtaButtonsGroupButtonTemplate: React.FunctionComponent<PropertyCardCtaButtonsGroupButtonTemplatePropsInterface> =
  (props) => {
    return (
      <ButtonTemplate
        className={styles.button}
        size={ButtonSizeEnum.small}
        href={props.href}
        componentType={ButtonComponentTypeEnum.tertiary}
        icon={{ component: props.iconComponent, position: ButtonIconPositionEnum.left }}
        onClick={(e): void => {
          e.preventDefault();
          props.onClick();
        }}
      >
        {props.label}
      </ButtonTemplate>
    );
  };
