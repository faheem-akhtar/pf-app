import { useState } from 'react';

import { AuthLoaderComponent } from 'components/auth/loader/component';
import { AuthRegisterService } from 'services/auth/register.service';
import { AuthRegistrationFieldEnum } from 'components/auth/registration/field.enum';
import { AuthRegistrationPropsInterface } from 'components/auth/registration/props.interface';
import { ButtonComponentTypeEnum } from 'library/button/component-type.enum';
import { ButtonSizeEnum } from 'library/button/size.enum';
import { ButtonTemplate } from 'library/button/template';
import { CheckboxTemplate } from 'library/checkbox/template';
import { domClassMerge } from 'helpers/dom/class-merge';
import { formMakeValidator } from 'components/form/make-validator';
import { GoogleRecaptchaService } from 'services/google-recaptcha/service';
import { InputBaseComponent } from 'library/input/base/component';
import { ReCaptchaComponent } from 'components/re-captcha/component';
import { useTranslation } from 'helpers/translation/hook';
import { validationEmail } from 'helpers/validation/email';
import { validationRequired } from 'helpers/validation/required';

import { configLinksSecondaryPrivacyPolicy } from 'config/links/secondary/privacy-policy';
import { configLinksSecondaryTermsConditions } from 'config/links/secondary/terms-conditions';

import styles from '../auth.module.scss';

const captchaService = new GoogleRecaptchaService();

export const AuthRegistrationComponent = (props: AuthRegistrationPropsInterface): JSX.Element => {
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [optedIn, setOptedIn] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<AuthRegistrationFieldEnum, string>>>({});
  const [errorMessage, setErrorMessage] = useState('');
  const [validators] = useState(() => ({
    [AuthRegistrationFieldEnum.email]: [
      validationRequired(t('auth/empty-email')),
      validationEmail(t('auth/not-valid-email')),
    ],
    [AuthRegistrationFieldEnum.password]: [validationRequired(t('auth/empty-password'))],
    [AuthRegistrationFieldEnum.firstName]: [validationRequired(t('auth/empty-first-name'))],
    [AuthRegistrationFieldEnum.lastName]: [validationRequired(t('auth/empty-last-name'))],
  }));
  const [isLoading, setIsLoading] = useState(false);

  // Generate T&C message
  const authText = t(`auth/accept-terms-and-conditions`);
  const authTextParts = authText.split('{link}');

  /**
   * Validate form fields
   */
  const validate = formMakeValidator(errors, setErrors, validators);

  return (
    <>
      <div className={styles.heading}>{t('auth/create-account')}</div>
      <AuthLoaderComponent isEnabled={isLoading} isCentered={true} />
      {errorMessage && <div className={domClassMerge(styles.error, styles['error-message'])}>{errorMessage}</div>}
      <form
        onSubmit={(e): void => {
          e.preventDefault();
          if (
            !validate({
              [AuthRegistrationFieldEnum.email]: email,
              [AuthRegistrationFieldEnum.password]: password,
              [AuthRegistrationFieldEnum.firstName]: firstName,
              [AuthRegistrationFieldEnum.lastName]: lastName,
            })
          ) {
            setIsLoading(true);
            captchaService.execute().then((captcha_token) => {
              AuthRegisterService({
                email,
                password,
                first_name: firstName,
                last_name: lastName,
                opted_in: optedIn,
                captcha_token,
              })
                .then((e) => {
                  if (e.ok) {
                    // Reset server error message
                    setErrorMessage('');

                    // Close modal
                    props.onClose();
                  } else {
                    setErrorMessage(e.error.body || `${t('auth/something-wrong')}! ${t('auth/try-later')}`);

                    // Reset captcha
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
            placeholder={t('auth/first-name')}
            type='text'
            value={firstName}
            error={!!errors[AuthRegistrationFieldEnum.firstName]}
            onChange={(value): void => {
              !validate({
                [AuthRegistrationFieldEnum.firstName]: value,
              });
              setFirstName(value);
            }}
            errorText={errors[AuthRegistrationFieldEnum.firstName]}
          />
        </div>

        <div className={styles['input-area']}>
          <InputBaseComponent
            placeholder={t('auth/last-mane')}
            type='text'
            value={lastName}
            error={!!errors[AuthRegistrationFieldEnum.lastName]}
            onChange={(value): void => {
              !validate({
                [AuthRegistrationFieldEnum.lastName]: value,
              });
              setLastName(value);
            }}
            errorText={errors[AuthRegistrationFieldEnum.lastName]}
          />
        </div>
        <div className={styles['input-area']}>
          <InputBaseComponent
            placeholder={t('email')}
            type='email'
            value={email}
            error={!!errors[AuthRegistrationFieldEnum.email]}
            onChange={(value): void => {
              validate({
                [AuthRegistrationFieldEnum.email]: value,
              });
              setEmail(value);
            }}
            errorText={errors[AuthRegistrationFieldEnum.email]}
          />
        </div>
        <div className={styles['input-area']}>
          <InputBaseComponent
            placeholder={t('password')}
            type='password'
            value={password}
            error={!!errors[AuthRegistrationFieldEnum.password]}
            onChange={(value): void => {
              !validate({
                [AuthRegistrationFieldEnum.password]: value,
              });
              setPassword(value);
            }}
            errorText={errors[AuthRegistrationFieldEnum.password]}
          />
        </div>

        <div className={styles['input-area']}>
          <CheckboxTemplate
            id='opten-in'
            checked={optedIn}
            onChange={(e): void => {
              setOptedIn(!!e.target.value);
            }}
          >
            <div className={styles['checkbox-text']}>{t('auth/free-guides')}</div>
          </CheckboxTemplate>
        </div>

        <div className={styles['input-area']}>
          <ButtonTemplate
            className={styles.button}
            type='submit'
            componentType={ButtonComponentTypeEnum.primary}
            size={ButtonSizeEnum.regular}
          >
            {t('auth/create-account')}
          </ButtonTemplate>
        </div>
        <ReCaptchaComponent />
      </form>
      <div className={domClassMerge(styles.link, styles['create-account'])} onClick={props.onLogin}>
        {t('auth/already-registered')}?&nbsp;{t('log-in')}
      </div>

      <div className={styles['policy-check']}>
        {authTextParts[0]}
        <a
          href={configLinksSecondaryTermsConditions.target}
          target='_blank'
          className={styles['compliance-link']}
          rel='noreferrer'
        >
          {t(configLinksSecondaryTermsConditions.translationKey)}
        </a>
        {authTextParts[1]}
        <a
          href={configLinksSecondaryPrivacyPolicy.target}
          target='_blank'
          className={styles['compliance-link']}
          rel='noreferrer'
        >
          {t('auth/our-privacy-policy')}
        </a>
        {authTextParts[2]}
      </div>
    </>
  );
};