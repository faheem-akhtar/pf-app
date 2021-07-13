import { Fragment, FunctionalComponent } from 'preact';
import { ButtonButtonTemplateInterface } from './button-template-props.interface';
import { ButtonIconPositionEnum } from './icon-position.enum';
import { ButtonLinkTemplatePropsInterface } from './link-template-props.interface';
import { LoaderTemplate } from 'components/loader/template';
import { domClassMerge } from 'helpers/dom/class-merge';
import styles from './button.module.scss';

// TODO-FE[TPNX-3016] add tests
/**
 * Web UI Kit Button tempalte
 * Figma: https://www.figma.com/file/gRARY1Vi4W2Ow1vRLw02am/PF_Consumer-Web-Kit?node-id=3869%3A2340
 */
export const LibraryButtonTemplate: FunctionalComponent<
  ButtonLinkTemplatePropsInterface | ButtonButtonTemplateInterface
> = ({ icon = {}, componentType, ...props }) => {
  const { component: Icon, position: iconPosition } = icon;
  const typeClass = styles[componentType];

  // TODO-FE[TPNX-2699] Use loader as per design
  const renderLoader = (): JSX.Element => (
    <LoaderTemplate cssClass={domClassMerge(styles.loader, styles[`${typeClass}Loader`])} />
  );
  const renderIcon = (): JSX.Element | null =>
    Icon ? (
      <Icon
        clipped={false}
        class={domClassMerge(
          styles.icon,
          styles[`${styles.icon}--${iconPosition}`],
          styles[`${typeClass}Icon`],
          props.iconClassName
        )}
      />
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
        typeClass,
        styles[`icon-${iconPosition}`],
        styles[props.size],
        {
          [styles[`${typeClass}--loading`]]: !!props.loading,
          [styles.disabled]: !!props.disabled,
          [styles[`${typeClass}--disabled`]]: !!props.disabled,
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
