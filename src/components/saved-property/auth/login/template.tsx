import React, { FunctionComponent } from 'react';

import { AuthLoaderComponent } from 'components/auth/loader/component';
import { AuthLoginTemplatePropsInterface } from 'components/auth/login/template-props.interface';
import { ErrorMessageComponent } from 'components/error-message/component';
import { IconFacebookTemplate } from 'components/icon/facebook-template';
import { IconGoogleTemplate } from 'components/icon/google-template';
import { IconThinCheckmarkTemplate } from 'components/icon/thin/checkmark-template';
import { domClassMerge } from 'helpers/dom/class-merge';
import { ButtonComponentTypeEnum } from 'library/button/component-type.enum';
import { ButtonIconPositionEnum } from 'library/button/icon-position.enum';
import { ButtonSizeEnum } from 'library/button/size.enum';
import { ButtonTemplate } from 'library/button/template';

import styles from './saved-property-auth-login.module.scss';

export const SavedPropertyAuthLoginTemplate: FunctionComponent<AuthLoginTemplatePropsInterface> = (props) => (
  <div data-testid='saved-property-auth-login-template'>
    <h1 className={styles.heading}>{props.t('saved_property/auth-login-title')}</h1>
    <ul className={styles.list}>
      <li>
        <IconThinCheckmarkTemplate class={styles.list__icon} /> {props.t('saved_property/auth-login-line-1')}
      </li>
      <li>
        <IconThinCheckmarkTemplate class={styles.list__icon} /> {props.t('saved_property/auth-login-line-2')}
      </li>
      <li>
        <IconThinCheckmarkTemplate class={styles.list__icon} /> {props.t('saved_property/auth-login-line-3')}
      </li>
    </ul>
    <ButtonTemplate
      className={styles.button}
      type='button'
      componentType={ButtonComponentTypeEnum.primary}
      size={ButtonSizeEnum.regular}
      onClick={props.onLogin}
    >
      {props.t('log-in')}
    </ButtonTemplate>
    <div className={styles.divider}>
      <span className={styles.text}>{props.t('auth/or')}</span>
    </div>
    <AuthLoaderComponent isEnabled={props.isLoading} isCentered={true} />
    {props.errorMessage && <ErrorMessageComponent message={props.errorMessage} />}
    {/* Google */}
    <ButtonTemplate
      type='button'
      className={domClassMerge(styles.button, styles.google)}
      componentType={ButtonComponentTypeEnum.tertiary}
      size={ButtonSizeEnum.small}
      onClick={props.onGoogleLoginClick}
      icon={{ component: IconGoogleTemplate, position: ButtonIconPositionEnum.left }}
    >
      {props.t('auth/sign-in-google')}
    </ButtonTemplate>
    {/* Facebook */}
    <ButtonTemplate
      type='button'
      className={domClassMerge(styles.button, styles.facebook)}
      componentType={ButtonComponentTypeEnum.tertiary}
      size={ButtonSizeEnum.small}
      onClick={props.onFacebookLoginClick}
      icon={{ component: IconFacebookTemplate, position: ButtonIconPositionEnum.left }}
    >
      {props.t('auth/sign-in-facebook')}
    </ButtonTemplate>
  </div>
);
