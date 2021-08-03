import { Fragment, FunctionComponent } from 'react';

import { domClassMerge } from 'helpers/dom/class-merge';

import { ButtonIconPositionEnum } from './icon-position.enum';
import { ButtonLinkTemplatePropsInterface } from './link-template-props.interface';
import { ButtonTemplatePropsInterface } from './template-props.interface';
import { LoaderTemplate } from 'components/loader/template';

import styles from './button.module.scss';

// TODO-FE[TPNX-3016] add tests
/**
 * Web UI Kit Button tempalte
 * Figma: https://www.figma.com/file/gRARY1Vi4W2Ow1vRLw02am/PF_Consumer-Web-Kit?node-id=3869%3A2340
 */
export const ButtonTemplate: FunctionComponent<ButtonLinkTemplatePropsInterface | ButtonTemplatePropsInterface> = ({
  icon = {},
  componentType,
  ...props
}) => {
  const { component: Icon, position: iconPosition } = icon;

  const renderLoader = (): JSX.Element => (
    <LoaderTemplate containerCssClass={styles.loader} dotCssClass={styles[`${componentType}--loader`]} />
  );

  const renderIcon = (): JSX.Element | null =>
    Icon ? (
      <Icon clipped={false} class={domClassMerge(styles.icon, styles[`icon--${iconPosition}`], icon.className)} />
    ) : null;

  const renderContent = (): JSX.Element => (
    <Fragment>
      {(iconPosition === ButtonIconPositionEnum.left || iconPosition === ButtonIconPositionEnum.top) && renderIcon()}
      {props.children}
      {iconPosition === ButtonIconPositionEnum.right && renderIcon()}
    </Fragment>
  );

  const Component = (props as ButtonLinkTemplatePropsInterface).href ? 'a' : 'button';

  return (
    <Component
      class={domClassMerge(
        styles.button,
        styles[componentType],
        styles[props.size],
        {
          [styles[`${componentType}--loading`]]: !!props.loading,
          [styles.disabled]: !!props.disabled,
          [styles.loading]: !!props.loading,
          [styles[`${componentType}--disabled`]]: !!props.disabled,
        },
        props.className
      )}
      disabled={props.disabled}
      onClick={!props.loading ? props.onClick : undefined}
      href={(props as ButtonLinkTemplatePropsInterface).href}
      target={(props as ButtonLinkTemplatePropsInterface).target}
    >
      {props.loading ? renderLoader() : renderContent()}
    </Component>
  );
};
