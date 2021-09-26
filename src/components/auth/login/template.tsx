import React, { FunctionComponent } from 'react';

import { AuthLoaderComponent } from 'components/auth/loader/component';
import { AuthLoginFieldEnum } from 'components/auth/login/field.enum';
import { ErrorMessageComponent } from 'components/error-message/component';
import { IconFacebookTemplate } from 'components/icon/facebook-template';
import { IconGoogleTemplate } from 'components/icon/google-template';
import { ReCaptchaComponent } from 'components/re-captcha/component';
import { domClassMerge } from 'helpers/dom/class-merge';
import { ButtonComponentTypeEnum } from 'library/button/component-type.enum';
import { ButtonIconPositionEnum } from 'library/button/icon-position.enum';
import { ButtonSizeEnum } from 'library/button/size.enum';
import { ButtonTemplate } from 'library/button/template';
import { InputBaseComponent } from 'library/input/base/component';

import styles from '../auth.module.scss';
import { AuthLoginTemplatePropsInterface } from './template-props.interface';

export const AuthLoginTemplate: FunctionComponent<AuthLoginTemplatePropsInterface> = (props) => (
  <div data-testid='AuthLoginComponent'>
    <h1 className={styles.heading}>{props.t('sign-in')}</h1>
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
    <div className={styles.divider}>
      <span className={styles.text}>{props.t('auth/or')}</span>
    </div>
    <AuthLoaderComponent isEnabled={props.isLoading} isCentered={true} />
    {props.errorMessage && <ErrorMessageComponent message={props.errorMessage} />}
    <form onSubmit={props.onFormSubmit}>
      <div className={styles['input-area']}>
        <InputBaseComponent
          id='email'
          name='email'
          placeholder={props.t('email')}
          type='email'
          value={props.email}
          error={!!props.errors[AuthLoginFieldEnum.email]}
          onChange={props.onEmailChange}
          errorText={props.errors[AuthLoginFieldEnum.email]}
        />
      </div>
      <div className={styles['input-area']}>
        <InputBaseComponent
          id='password'
          name='password'
          placeholder={props.t('password')}
          type='password'
          value={props.password}
          error={!!props.errors[AuthLoginFieldEnum.password]}
          onChange={props.onPasswordChange}
          errorText={props.errors[AuthLoginFieldEnum.password]}
        />
      </div>
      <div className={styles['input-area']} onClick={props.onForgotPassword}>
        <div className={domClassMerge(styles.link, styles['forgot-password'])}>{props.t('auth/forgot-password')}?</div>
      </div>
      <div className={styles['input-area']}>
        <ButtonTemplate
          className={styles.button}
          type='submit'
          componentType={ButtonComponentTypeEnum.primary}
          size={ButtonSizeEnum.regular}
        >
          {props.t('log-in')}
        </ButtonTemplate>
      </div>
      <ReCaptchaComponent />
    </form>
    <div className={domClassMerge(styles.link, styles['create-account'])} onClick={props.onRegister}>
      {props.t('auth/not-registered-yet')}?&nbsp;{props.t('auth/create-account')}
    </div>
  </div>
);
