import { AuthFacebookService } from 'services/auth/facebook.service';
import { AuthGoogleService } from 'services/auth/google.service';
import { AuthLoginService } from 'services/auth/login.service';
import { domClassMerge } from 'helpers/dom/class-merge';

import { ButtonComponentTypeEnum } from 'library/button/component-type.enum';
import { ButtonIconPositionEnum } from 'library/button/icon-position.enum';
import { ButtonSizeEnum } from 'library/button/size.enum';
import { ButtonTemplate } from 'library/button/template';
import { GoogleRecaptchaService } from 'services/google-recaptcha/service';
import { IconFacebookTemplate } from 'components/icon/facebook-template';
import { IconGoogleTemplate } from 'components/icon/google-template';
import { IconThinFilterOpenTemplate } from 'components/icon/thin/filter-open-template';

import styles from './auth-modal-component.module.scss';
import { useState } from 'react';
const captchaService = new GoogleRecaptchaService();

// TODO-FE[CX-218] - Update template
export const AuthModalComponent = ({ close }: { close: () => void }): JSX.Element => {
  const [email, setEmail] = useState('imagine@me.com');
  const [password, setPassword] = useState('defender12');

  return (
    <div className='authentication'>
      <ButtonTemplate
        type='button'
        componentType={ButtonComponentTypeEnum.tertiary}
        size={ButtonSizeEnum.small}
        onClick={close}
        icon={{ component: IconThinFilterOpenTemplate, position: ButtonIconPositionEnum.left }}
      >
        {'close'}
      </ButtonTemplate>
      <div className='authentication__content'>
        <ButtonTemplate
          type='button'
          className={domClassMerge(styles.authModal__btn, styles.authModal__btnFacebook)}
          componentType={ButtonComponentTypeEnum.tertiary}
          size={ButtonSizeEnum.small}
          onClick={(): void => {
            AuthFacebookService.signIn()
              .then(close)
              .catch((error) => {
                // TODO-FE[CX-222] - Add validation
                close();
                // eslint-disable-next-line no-console
                console.error(error);
              });
          }}
          icon={{ component: IconFacebookTemplate, position: ButtonIconPositionEnum.left }}
        >
          {'Sign in with Facebook'}
        </ButtonTemplate>
        <ButtonTemplate
          type='button'
          className={domClassMerge(styles.authModal__btn, styles.authModal__btnFacebook)}
          componentType={ButtonComponentTypeEnum.tertiary}
          size={ButtonSizeEnum.small}
          onClick={(): void => {
            AuthGoogleService.signIn()
              .then(close)
              .catch((error) => {
                // TODO-FE[CX-222] - Add validation
                close();
                // eslint-disable-next-line no-console
                console.error(error);
              });
          }}
          icon={{ component: IconGoogleTemplate, position: ButtonIconPositionEnum.left }}
        >
          {'Sign in with Google'}
        </ButtonTemplate>
        <div className='authentication__divider'>
          <span className='authentication__divider-txt'>{'or'}</span>
        </div>
        {/*{props.error && <div className='authentication__error--general'>{props.error}</div>}*/}
        <div className='authentication__form'>
          <div className='authentication__input-area'>
            <div className='authentication__input-label'>{'Enter your email'}</div>
            <input
              type='text'
              className='authentication__input'
              // value={props.fields.email}
              value={email}
              // onKeyUp={(e) => props.onKeyUpInput(e)}
              // onChange={(e: Event) => props.onChangeInput(e, 'email')}
              onChange={(e): void => setEmail((e.target as HTMLInputElement).value)}
            />
            {/*<div className='authentication__error'>{props.fieldErrors.email}</div>*/}
          </div>
          <div className='authentication__input-area'>
            {/*<div className='authentication__input-label'>{i18nTranslate('Enter your password')}</div>*/}
            <input
              type='password'
              className='authentication__input'
              // value={props.fields.password}
              value={password}
              // onKeyUp={(e) => props.onKeyUpInput(e)}
              onChange={(e): void => setPassword((e.target as HTMLInputElement).value)}
            />
            {/*<div className='authentication__error'>{props.fieldErrors.password}</div>*/}
          </div>

          {/*<div className='authentication__input-area'>*/}
          {/*  <GoogleRecaptchaTemplate {...props.captcha} />*/}

          {/*  <div className='authentication__error'>{props.fieldErrors.captcha_token}</div>*/}
          {/*</div>*/}

          <div className='authentication__form-submit'>
            <ButtonTemplate
              type='button'
              componentType={ButtonComponentTypeEnum.tertiary}
              size={ButtonSizeEnum.small}
              onClick={(): void => {
                captchaService.load().then((captcha_token) => {
                  AuthLoginService({
                    email,
                    password,
                    captcha_token,
                  })
                    .then(close)
                    .catch((error): void => {
                      // TODO-FE[CX-222] - Add validation
                      // eslint-disable-next-line no-console
                      console.error(error);
                    });
                });
              }}
            >
              {'Log in'}
            </ButtonTemplate>
          </div>
        </div>
      </div>
      <div className='authentication__footer' />
      {/*<LoaderComponent isEnabled={props.loaderEnabled} isCentered={true} />*/}
    </div>
  );
};
