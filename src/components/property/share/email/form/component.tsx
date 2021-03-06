import { FormEvent, useContext, useState } from 'react';

import { apiPropertyShareFetcher } from 'api/property/share/fetcher';
import { ErrorMessageComponent } from 'components/error-message/component';
import { formMakeValidator } from 'components/form/make-validator';
import { ReCaptchaComponent } from 'components/re-captcha/component';
import { UserContext } from 'components/user/context';
import { configSiteNameValue } from 'config/site-name/value';
import { validationEmail } from 'helpers/validation/email';
import { validationRequired } from 'helpers/validation/required';
import { ButtonComponentTypeEnum } from 'library/button/component-type.enum';
import { ButtonSizeEnum } from 'library/button/size.enum';
import { ButtonTemplate } from 'library/button/template';
import { InputBaseComponent } from 'library/input/base/component';
import { GoogleRecaptchaService } from 'services/google/recaptcha.service';

import { PropertyShareEmailFieldsEnum } from '../fields.enum';
import { PropertyShareEmailFormComponentPropsInterface } from './component-props.interface';
import styles from './property-share-email-form.module.scss';

export const PropertyShareEmailFormComponent = ({
  propertyId,
  onFormSubmitted,
  t,
}: PropertyShareEmailFormComponentPropsInterface): JSX.Element => {
  const captchaService = GoogleRecaptchaService();
  const user = useContext(UserContext);
  const [email, setEmail] = useState<string>(user?.email || '');
  const [friendEmail, setFriendEmail] = useState<string>('');
  const [message, setMessage] = useState<string>(
    t('social-share/default-message', { sitename: t(configSiteNameValue) })
  );
  const [requestErrorMessage, setRequestErrorMessage] = useState('');
  const [errors, setErrors] = useState<Partial<Record<PropertyShareEmailFieldsEnum, string>>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [validators] = useState(() => ({
    [PropertyShareEmailFieldsEnum.email]: [
      validationRequired(t('validation/empty-email')),
      validationEmail(t('validation/not-valid-email')),
    ],
    [PropertyShareEmailFieldsEnum.friendsEmail]: [
      validationRequired(t('social-share/empty-friends-mail')),
      validationEmail(t('validation/not-valid-email')),
    ],
    [PropertyShareEmailFieldsEnum.message]: [validationRequired(t('social-share/not-empty-message'))],
  }));

  const validate = formMakeValidator(errors, setErrors, validators);

  const onSubmitForm = async (e: FormEvent<HTMLElement>): Promise<void> => {
    e.preventDefault();
    setRequestErrorMessage('');
    if (
      !validate({
        [PropertyShareEmailFieldsEnum.email]: email,
        [PropertyShareEmailFieldsEnum.friendsEmail]: friendEmail,
        [PropertyShareEmailFieldsEnum.message]: message,
      })
    ) {
      setIsLoading(true);
      const captcha_token = await captchaService.execute();

      const shareProperty = await apiPropertyShareFetcher(propertyId, {
        email,
        message,
        friend_email: friendEmail,
        captcha_token,
      });
      if (shareProperty.ok !== null) {
        setIsLoading(false);
      }

      if (shareProperty.ok) {
        onFormSubmitted();
      } else {
        setRequestErrorMessage(t('something-wrong-try-again'));
        setIsLoading(false);
        captchaService.reset();
      }
    }
  };

  return (
    <form onSubmit={onSubmitForm}>
      <div className={styles.field}>
        <InputBaseComponent
          id='email'
          name='email'
          value={email}
          type='email'
          inputClassName={styles.input}
          errorText={errors.email}
          onChange={(value): void => {
            validate({ [PropertyShareEmailFieldsEnum.email]: value });
            setEmail(value);
          }}
          placeholder={t('your-email')}
        />
      </div>
      <div className={styles.field}>
        <InputBaseComponent
          id='friends-email'
          name='friends-email'
          type='email'
          value={friendEmail}
          inputClassName={styles.input}
          errorText={errors.friendsEmail}
          onChange={(value): void => {
            validate({ [PropertyShareEmailFieldsEnum.friendsEmail]: value });
            setFriendEmail(value);
          }}
          placeholder={t('friends-email')}
        />
      </div>
      <div className={styles.field}>
        <InputBaseComponent
          id='message'
          name='message'
          value={message}
          inputClassName={styles.textarea}
          textarea
          errorText={errors.message}
          onChange={(value): void => {
            validate({ [PropertyShareEmailFieldsEnum.message]: value });
            setMessage(value);
          }}
        />
      </div>
      <div className={styles.field}>
        {requestErrorMessage && <ErrorMessageComponent message={requestErrorMessage} />}
        <ButtonTemplate
          type='submit'
          loading={isLoading}
          size={ButtonSizeEnum.regular}
          componentType={ButtonComponentTypeEnum.primary}
          fullWidth
        >
          {t('send')}
        </ButtonTemplate>
      </div>
      <ReCaptchaComponent />
    </form>
  );
};
