import React, { useState } from 'react';

import { AuthLoaderComponent } from 'components/auth/loader/component';
import { AuthLoginFieldEnum } from 'components/auth/login/field.enum';
import { AuthLoginPropsInterface } from 'components/auth/login/props.interface';
import { ErrorMessageComponent } from 'components/error-message/component';
import { formMakeValidator } from 'components/form/make-validator';
import { IconFacebookTemplate } from 'components/icon/facebook-template';
import { IconGoogleTemplate } from 'components/icon/google-template';
import { ReCaptchaComponent } from 'components/re-captcha/component';
import { domClassMerge } from 'helpers/dom/class-merge';
import { useTranslation } from 'helpers/translation/hook';
import { validationEmail } from 'helpers/validation/email';
import { validationRequired } from 'helpers/validation/required';
import { ButtonComponentTypeEnum } from 'library/button/component-type.enum';
import { ButtonIconPositionEnum } from 'library/button/icon-position.enum';
import { ButtonSizeEnum } from 'library/button/size.enum';
import { ButtonTemplate } from 'library/button/template';
import { InputBaseComponent } from 'library/input/base/component';
import { AuthFacebookService } from 'services/auth/facebook.service';
import { AuthGoogleService } from 'services/auth/google.service';
import { AuthLoginService } from 'services/auth/login.service';
import { GoogleRecaptchaService } from 'services/google/recaptcha.service';

import styles from '../auth.module.scss';

export const AuthLoginComponent = (props: AuthLoginPropsInterface): JSX.Element => {
  const captchaService = GoogleRecaptchaService();
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Partial<Record<AuthLoginFieldEnum, string>>>({});
  const [errorMessage, setErrorMessage] = useState('');
  const [validators] = useState(() => ({
    [AuthLoginFieldEnum.email]: [
      validationRequired(t('validation/empty-email')),
      validationEmail(t('validation/not-valid-email')),
    ],
    [AuthLoginFieldEnum.password]: [validationRequired(t('auth/empty-password'))],
  }));
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Validate form fields
   */
  const validate = formMakeValidator(errors, setErrors, validators);

  return (
    <div>
      <h1 className={styles.heading}>{t('sign-in')}</h1>
      {/* Facebook */}
      <ButtonTemplate
        type='button'
        className={domClassMerge(styles.button, styles.facebook)}
        componentType={ButtonComponentTypeEnum.tertiary}
        size={ButtonSizeEnum.small}
        onClick={(): void => {
          setIsLoading(true);
          AuthFacebookService.signIn()
            .then(() => {
              props.onSuccess();
              props.onClose();
            })
            .catch(() => {
              setErrorMessage(`${t('auth/something-wrong')}! ${t('auth/try-later')}`);
              props.onClose();
            })
            .finally(() => setIsLoading(false));
        }}
        icon={{ component: IconFacebookTemplate, position: ButtonIconPositionEnum.left }}
      >
        {t('auth/sign-in-facebook')}
      </ButtonTemplate>
      {/* Google */}
      <ButtonTemplate
        type='button'
        className={domClassMerge(styles.button, styles.google)}
        componentType={ButtonComponentTypeEnum.tertiary}
        size={ButtonSizeEnum.small}
        onClick={(): void => {
          setIsLoading(true);
          AuthGoogleService.signIn()
            .then(() => {
              props.onSuccess();
              props.onClose();
            })
            .catch(() => {
              setErrorMessage(`${t('auth/something-wrong')}! ${t('auth/try-later')}`);
              props.onClose();
            })
            .finally(() => setIsLoading(false));
        }}
        icon={{ component: IconGoogleTemplate, position: ButtonIconPositionEnum.left }}
      >
        {t('auth/sign-in-google')}
      </ButtonTemplate>
      <div className={styles.divider}>
        <span className={styles.text}>{t('auth/or')}</span>
      </div>
      <AuthLoaderComponent isEnabled={isLoading} isCentered={true} />
      {errorMessage && <ErrorMessageComponent message={errorMessage} />}
      <form
        onSubmit={(e): void => {
          e.preventDefault();

          if (
            !validate({
              [AuthLoginFieldEnum.email]: email,
              [AuthLoginFieldEnum.password]: password,
            })
          ) {
            setIsLoading(true);
            captchaService.execute().then((captcha_token) => {
              AuthLoginService({
                email,
                password,
                captcha_token,
              })
                .then((e) => {
                  if (e.ok) {
                    // Reset server error message
                    setErrorMessage('');
                    // Close modal
                    props.onClose();
                    props.onSuccess();
                  } else {
                    setErrorMessage(e.error.body || `${t('auth/something-wrong')}! ${t('auth/try-later')}`);
                    captchaService.reset();
                  }
                })
                .finally(() => setIsLoading(false));
            });
          }
          return;
        }}
      >
        <div className={styles['input-area']}>
          <InputBaseComponent
            id='email'
            name='email'
            placeholder={t('email')}
            type='email'
            value={email}
            error={!!errors[AuthLoginFieldEnum.email]}
            onChange={(value): void => {
              validate({
                [AuthLoginFieldEnum.email]: value,
              });
              setEmail(value);
            }}
            errorText={errors[AuthLoginFieldEnum.email]}
          />
        </div>
        <div className={styles['input-area']}>
          <InputBaseComponent
            id='password'
            name='password'
            placeholder={t('password')}
            type='password'
            value={password}
            error={!!errors[AuthLoginFieldEnum.password]}
            onChange={(value): void => {
              !validate({
                [AuthLoginFieldEnum.password]: value,
              });
              setPassword(value);
            }}
            errorText={errors[AuthLoginFieldEnum.password]}
          />
        </div>
        <div className={styles['input-area']} onClick={props.onForgotPassword}>
          <div className={domClassMerge(styles.link, styles['forgot-password'])}>{t('auth/forgot-password')}?</div>
        </div>
        <div className={styles['input-area']}>
          <ButtonTemplate
            className={styles.button}
            type='submit'
            componentType={ButtonComponentTypeEnum.primary}
            size={ButtonSizeEnum.regular}
          >
            {t('log-in')}
          </ButtonTemplate>
        </div>
        <ReCaptchaComponent />
      </form>
      <div className={domClassMerge(styles.link, styles['create-account'])} onClick={props.onRegister}>
        {t('auth/not-registered-yet')}?&nbsp;{t('auth/create-account')}
      </div>
    </div>
  );
};
