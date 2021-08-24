import { useState } from 'react';
import { useTranslationHook } from 'helpers/hook/translation.hook';

import { AuthLoginFieldEnum } from 'components/auth/login/field.enum';
import { AuthLoginService } from 'services/auth/login.service';
import { ButtonComponentTypeEnum } from 'library/button/component-type.enum';
import { ButtonSizeEnum } from 'library/button/size.enum';
import { ButtonTemplate } from 'library/button/template';
import { formMakeValidator } from 'components/form/make-validator';
import { GoogleRecaptchaService } from 'services/google-recaptcha/service';
import { validationEmail } from 'helpers/validation/email';
import { validationRequired } from 'helpers/validation/required';
const captchaService = new GoogleRecaptchaService();

export const AuthLoginComponent = ({ close }: { close: () => void }): JSX.Element => {
  const { t } = useTranslationHook();

  const [email, setEmail] = useState('imagine@me.com');
  const [password, setPassword] = useState('defender12');
  const [errors, setErrors] = useState<Partial<Record<AuthLoginFieldEnum, string>>>({});
  const [errorMessage, setErrorMessage] = useState('');
  const [validators] = useState(() => ({
    [AuthLoginFieldEnum.email]: [
      validationRequired(t('Please enter your email')),
      validationEmail(t('Please enter a valid email')),
    ],
    [AuthLoginFieldEnum.password]: [validationRequired(t('Please enter a password'))],
  }));

  /**
   * Validate form fields
   */
  const validate = formMakeValidator(setErrors, validators);

  // TODO-FE[CX-218] - Update template
  return (
    <>
      {errorMessage && <div className='authentication__error--general'>{errorMessage}</div>}
      <form
        className='authentication__form'
        onSubmit={(e): void => {
          e.preventDefault();
          if (
            validate({
              [AuthLoginFieldEnum.email]: email,
              [AuthLoginFieldEnum.password]: password,
            })
          ) {
            captchaService.execute().then((captcha_token) => {
              AuthLoginService({
                email,
                password,
                captcha_token,
              }).then((e) => {
                if (e.ok) {
                  // Reset server error message
                  setErrorMessage('');
                  // Close modal
                  close();
                } else {
                  setErrorMessage(e.error.body || t('Something went wrong! Please try again later'));
                  captchaService.reset();
                }
              });
            });
          }
          return;
        }}
      >
        <div className='authentication__input-area'>
          <div className='authentication__input-label'>{'Enter your email'}</div>
          <input
            type='text'
            className='authentication__input'
            value={email}
            onChange={(e): void => {
              const value = e.target.value;
              validate({
                [AuthLoginFieldEnum.email]: value,
              });
              setEmail(value);
            }}
          />
          <div className='authentication__error'>{errors[AuthLoginFieldEnum.email]}</div>
        </div>
        <div className='authentication__input-area'>
          <input
            type='password'
            className='authentication__input'
            value={password}
            onChange={(e): void => {
              const value = e.target.value;
              !validate({
                [AuthLoginFieldEnum.password]: value,
              });
              setPassword(value);
            }}
          />
          <div className='authentication__error'>{errors[AuthLoginFieldEnum.password]}</div>
        </div>

        <div className='authentication__form-submit'>
          <ButtonTemplate type='submit' componentType={ButtonComponentTypeEnum.tertiary} size={ButtonSizeEnum.small}>
            {'Log in'}
          </ButtonTemplate>
        </div>
      </form>
    </>
  );
};
