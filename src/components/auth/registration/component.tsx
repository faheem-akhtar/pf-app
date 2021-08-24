import { useState } from 'react';
import { useTranslationHook } from 'helpers/hook/translation.hook';

import { ApiFetcherResultFailureInterface } from 'api/fetcher-result-failure.interface';
import { AuthRegisterService } from 'services/auth/register.service';
import { AuthRegistrationFieldEnum } from 'components/auth/registration/field.enum';
import { ButtonComponentTypeEnum } from 'library/button/component-type.enum';
import { ButtonSizeEnum } from 'library/button/size.enum';
import { ButtonTemplate } from 'library/button/template';
import { CheckboxTemplate } from 'library/checkbox/template';
import { formMakeValidator } from 'components/form/make-validator';
import { GoogleRecaptchaService } from 'services/google-recaptcha/service';
import { validationEmail } from 'helpers/validation/email';
import { validationRequired } from 'helpers/validation/required';

const captchaService = new GoogleRecaptchaService();

export const AuthRegistrationComponent = ({ close }: { close: () => void }): JSX.Element => {
  const { t } = useTranslationHook();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [optedIn, setOptedIn] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<AuthRegistrationFieldEnum, string>>>({});
  const [errorMessage, setErrorMessage] = useState('');
  const [validators] = useState(() => ({
    [AuthRegistrationFieldEnum.email]: [
      validationRequired(t('Enter your email')),
      validationEmail(t('Please enter a valid email')),
    ],
    [AuthRegistrationFieldEnum.password]: [validationRequired(t('Please enter a password'))],
    [AuthRegistrationFieldEnum.firstName]: [validationRequired(t('Please enter a valid first and last name'))],
    [AuthRegistrationFieldEnum.lastName]: [validationRequired(t('Please enter a valid first and last name'))],
  }));

  /**
   * Validate form fields
   */
  const validate = formMakeValidator(setErrors, validators);

  // TODO-FE[CX-219] - Update template
  return (
    <>
      {errorMessage && <div className='authentication__error--general'>{errorMessage}</div>}
      <form
        className='authentication__form'
        onSubmit={(e): void => {
          e.preventDefault();
          if (
            validate({
              [AuthRegistrationFieldEnum.email]: email,
              [AuthRegistrationFieldEnum.password]: password,
              [AuthRegistrationFieldEnum.firstName]: firstName,
              [AuthRegistrationFieldEnum.lastName]: lastName,
            })
          ) {
            captchaService.execute().then((captcha_token) => {
              AuthRegisterService({
                email,
                password,
                first_name: firstName,
                last_name: lastName,
                opted_in: optedIn,
                captcha_token,
              }).then((e) => {
                if (!(e as ApiFetcherResultFailureInterface).ok) {
                  setErrorMessage(
                    (e as ApiFetcherResultFailureInterface).error.body ||
                      t('Something went wrong! Please try again later')
                  );
                  captchaService.reset();
                } else {
                  // Reset server error message
                  setErrorMessage('');
                  // Close modal
                  close();
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
                [AuthRegistrationFieldEnum.email]: value,
              });
              setEmail(value);
            }}
          />
          <div className='authentication__error'>{errors[AuthRegistrationFieldEnum.email]}</div>
        </div>
        <div className='authentication__input-area'>
          <div className='authentication__input-label'>{'Enter your first name'}</div>
          <input
            type='text'
            className='authentication__input'
            value={email}
            onChange={(e): void => {
              const value = e.target.value;
              validate({
                [AuthRegistrationFieldEnum.firstName]: value,
              });
              setFirstName(value);
            }}
          />
          <div className='authentication__error'>{errors[AuthRegistrationFieldEnum.firstName]}</div>
        </div>
        <div className='authentication__input-area'>
          <div className='authentication__input-label'>{'Enter your last name'}</div>
          <input
            type='text'
            className='authentication__input'
            value={email}
            onChange={(e): void => {
              const value = e.target.value;
              validate({
                [AuthRegistrationFieldEnum.lastName]: value,
              });
              setLastName(value);
            }}
          />
          <div className='authentication__error'>{errors[AuthRegistrationFieldEnum.lastName]}</div>
        </div>
        <div className='authentication__input-area'>
          <input
            type='password'
            className='authentication__input'
            value={password}
            onChange={(e): void => {
              const value = e.target.value;
              !validate({
                [AuthRegistrationFieldEnum.password]: value,
              });
              setPassword(value);
            }}
          />
          <div className='authentication__error'>{errors[AuthRegistrationFieldEnum.password]}</div>
        </div>
        <div className='authentication__input-area'>
          <CheckboxTemplate
            id='Opten in'
            checked={optedIn}
            onChange={(e): void => {
              setOptedIn(!!e.target.value);
            }}
          >
            {t('filters-modal/commercial-only')}
          </CheckboxTemplate>
        </div>

        <div className='authentication__form-submit'>
          <ButtonTemplate type='submit' componentType={ButtonComponentTypeEnum.tertiary} size={ButtonSizeEnum.small}>
            {'Register'}
          </ButtonTemplate>
        </div>
      </form>
    </>
  );
};
