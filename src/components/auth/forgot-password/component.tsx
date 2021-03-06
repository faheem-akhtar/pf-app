import React, { useState } from 'react';

import { AuthForgotPasswordFieldEnum } from 'components/auth/forgot-password/field.enum';
import { AuthLoaderComponent } from 'components/auth/loader/component';
import { AuthLoginFieldEnum } from 'components/auth/login/field.enum';
import { ErrorMessageComponent } from 'components/error-message/component';
import { formMakeValidator } from 'components/form/make-validator';
import { ReCaptchaComponent } from 'components/re-captcha/component';
import { domClassMerge } from 'helpers/dom/class-merge';
import { useTranslation } from 'helpers/translation/hook';
import { validationEmail } from 'helpers/validation/email';
import { validationRequired } from 'helpers/validation/required';
import { ButtonComponentTypeEnum } from 'library/button/component-type.enum';
import { ButtonSizeEnum } from 'library/button/size.enum';
import { ButtonTemplate } from 'library/button/template';
import { InputBaseComponent } from 'library/input/base/component';
import { AuthResetPasswordService } from 'services/auth/reset-password.service';
import { GoogleRecaptchaService } from 'services/google/recaptcha.service';

import styles from '../auth.module.scss';
import { AuthForgotPasswordComponentPropsInterface } from './component-props.interface';

export const AuthForgotPasswordComponent = (props: AuthForgotPasswordComponentPropsInterface): JSX.Element => {
  const captchaService = GoogleRecaptchaService();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Partial<Record<AuthLoginFieldEnum, string>>>({});
  const [errorMessage, setErrorMessage] = useState('');
  const [validators] = useState(() => ({
    [AuthLoginFieldEnum.email]: [
      validationRequired(t('validation/empty-email')),
      validationEmail(t('validation/not-valid-email')),
    ],
  }));
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Validate form fields
   */
  const validate = formMakeValidator(errors, setErrors, validators);

  // TODO-FE[CX-499] - Add success message
  return (
    <div>
      <h1 className={styles.heading}>{t('auth/forgot-password')}?</h1>
      <AuthLoaderComponent isEnabled={isLoading} isCentered={true} />
      {errorMessage && <ErrorMessageComponent message={errorMessage} />}
      <form
        onSubmit={(e): void => {
          e.preventDefault();

          if (
            !validate({
              [AuthForgotPasswordFieldEnum.email]: email,
            })
          ) {
            setIsLoading(true);
            captchaService.execute().then((captcha_token) => {
              AuthResetPasswordService({
                email,
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
                    setErrorMessage(e.error?.body || `${t('auth/something-wrong')}! ${t('auth/try-later')}`);
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
            onChange={(value): void => {
              validate({
                [AuthForgotPasswordFieldEnum.email]: value,
              });
              setEmail(value);
            }}
            errorText={errors[AuthForgotPasswordFieldEnum.email]}
          />
        </div>
        <div className={styles['input-area']}>
          <ButtonTemplate
            className={styles.button}
            type='submit'
            componentType={ButtonComponentTypeEnum.primary}
            size={ButtonSizeEnum.regular}
          >
            {t('auth/reset-password')}
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
