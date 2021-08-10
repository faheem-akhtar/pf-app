import AuthService from 'services/auth/service';
import { useContext } from 'react';
import { useRouter } from 'next/router';

import { GoogleRecaptchaService } from 'services/google-recaptcha/service';
import { HeaderTemplate } from './template';
import { UserContext } from 'context/user/context';

const captchaService = new GoogleRecaptchaService();

export const HeaderComponent = (): JSX.Element => {
  const locale = useRouter().locale as string;

  const user = useContext(UserContext);

  return (
    <HeaderTemplate
      locale={locale}
      userProfile={{
        user,
        savedPropertiesCount: 5,
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
