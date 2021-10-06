import React, { FunctionComponent, useState } from 'react';

import { AuthLoginFieldEnum } from 'components/auth/login/field.enum';
import { AuthLoginPropsInterface } from 'components/auth/login/props.interface';
import { formMakeValidator } from 'components/form/make-validator';
import { functionNoop } from 'helpers/function/noop';
import { useTranslation } from 'helpers/translation/hook';
import { validationEmail } from 'helpers/validation/email';
import { validationRequired } from 'helpers/validation/required';
import { AuthFacebookService } from 'services/auth/facebook.service';
import { AuthGoogleService } from 'services/auth/google.service';
import { AuthLoginService } from 'services/auth/login.service';
import { GoogleRecaptchaService } from 'services/google/recaptcha.service';

import { AuthSuccessTypeEnum } from '../success-type.enum';
import { AuthLoginTemplate } from './template';
import { AuthLoginTemplatePropsInterface } from './template-props.interface';

export const AuthLoginComponent: FunctionComponent<AuthLoginPropsInterface> = ({
  onGoogleLoginStart = functionNoop,
  onFacebookLoginStart = functionNoop,
  ...props
}): JSX.Element => {
  const Template = props.template || AuthLoginTemplate;
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

  const onFacebookLoginClick = (): void => {
    onFacebookLoginStart();
    setIsLoading(true);
    AuthFacebookService.signIn()
      .then(() => {
        props.onSuccess(AuthSuccessTypeEnum.signInWithFacebook);
        props.onClose();
      })
      .catch(() => {
        setErrorMessage(`${t('auth/something-wrong')}! ${t('auth/try-later')}`);
        props.onClose();
      })
      .finally(() => setIsLoading(false));
  };

  const onGoogleLoginClick = (): void => {
    onGoogleLoginStart();
    setIsLoading(true);
    AuthGoogleService.signIn()
      .then(() => {
        props.onSuccess(AuthSuccessTypeEnum.signInWithGoogle);
        props.onClose();
      })
      .catch(() => {
        setErrorMessage(`${t('auth/something-wrong')}! ${t('auth/try-later')}`);
        props.onClose();
      })
      .finally(() => setIsLoading(false));
  };

  const onFormSubmit: AuthLoginTemplatePropsInterface['onFormSubmit'] = (event) => {
    event.preventDefault();

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
              props.onSuccess(AuthSuccessTypeEnum.signInWithEmail);
            } else {
              setErrorMessage(e.error.body || `${t('auth/something-wrong')}! ${t('auth/try-later')}`);
              captchaService.reset();
            }
          })
          .finally(() => setIsLoading(false));
      });
    }
    return;
  };

  return (
    <Template
      isLoading={isLoading}
      errorMessage={errorMessage}
      email={email}
      password={password}
      errors={errors}
      t={t}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onForgotPassword={props.onForgotPassword}
      onLogin={props.onLogin}
      onRegister={props.onRegister}
      onFacebookLoginClick={onFacebookLoginClick}
      onGoogleLoginClick={onGoogleLoginClick}
      onFormSubmit={onFormSubmit}
    />
  );
};
