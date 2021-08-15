import AuthService from 'services/auth/service';
import { useContext } from 'react';
import { useRouter } from 'next/router';

import { GoogleRecaptchaService } from 'services/google-recaptcha/service';
import { HeaderTemplate } from './template';
import { UserContext } from 'context/user/context';

import { useApiContactedProperties } from 'api/contacted-properties/hook';
import { useApiSavedProperties } from 'api/saved-properties/hook';

const captchaService = new GoogleRecaptchaService();

export const HeaderComponent = (): JSX.Element => {
  const locale = useRouter().locale as string;

  const user = useContext(UserContext);
  const savedPropertiesCountResponse = useApiSavedProperties();
  const savedPropertiesCount = savedPropertiesCountResponse.ok ? savedPropertiesCountResponse.data.length : 0;
  const contactedPropertiesResponse = useApiContactedProperties();

  if (contactedPropertiesResponse.ok) {
    // eslint-disable-next-line no-console
    console.log('contacted properties', contactedPropertiesResponse.data);
  }

  return (
    <HeaderTemplate
      locale={locale}
      userProfile={{
        user,
        savedPropertiesCount,
      }}
      onLoginButtonClick={(): void => {
        captchaService.load().then((captcha_token) => {
          const email = prompt(
            'Your staging email address please (you can skip to use mine)',
            'imagine@me.com'
          ) as string;
          const password = prompt('Your staging password please (you can skip to use mine)', 'defender12') as string;
          AuthService.signIn({
            email,
            password,
            captcha_token,
          });
        });
      }}
    />
  );
};
