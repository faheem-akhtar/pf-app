import React, { useEffect, useState } from 'react';

import { AuthForgotPasswordComponent } from 'components/auth/forgot-password/component';
import { AuthLoginComponent } from 'components/auth/login/component';
import { AuthRegistrationComponent } from 'components/auth/registration/component';
import { AuthScreenEnum } from 'components/auth/screen.enum';
import { IconThickCrossTemplate } from 'components/icon/thick/cross-template';
import { UserInterface } from 'components/user/interface';
import { functionNoop } from 'helpers/function/noop';
import { tealiumUserEventTracker } from 'services/tealium/user-event-tracker';

import { AuthSuccessTypeEnum } from '../success-type.enum';
import { authTracker } from '../tracker';
import styles from './auth-modal-component.module.scss';
import { AuthModalComponentPropsInterface } from './component-props.interface';

export const AuthModalComponent = ({
  eventLabel = 'Header',
  initialScreen = AuthScreenEnum.login,
  loginTemplate,
  close = functionNoop,
  cancel = functionNoop,
  success = functionNoop,
}: AuthModalComponentPropsInterface): JSX.Element => {
  const [authScreen, setAuthScreen] = useState(initialScreen);

  useEffect(() => {
    if (authScreen === AuthScreenEnum.login) {
      authTracker.onOpenLoginForm(eventLabel);
    }

    if (authScreen === AuthScreenEnum.registration) {
      authTracker.onOpenRegisterForm(eventLabel);
    }

    if (authScreen === AuthScreenEnum.forgotPassword) {
      authTracker.onOpenForgotPasswordForm(eventLabel);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authScreen]);

  const onSuccess = (type?: AuthSuccessTypeEnum, user?: UserInterface): void => {
    if (type === AuthSuccessTypeEnum.signInWithEmail) {
      authTracker.onSuccessLoginWithEmail(eventLabel);
      user && tealiumUserEventTracker.onLoginWithEmail(user);
    }

    if (type === AuthSuccessTypeEnum.signInWithFacebook) {
      authTracker.onSuccessLoginWithFacebook(eventLabel);
      user && tealiumUserEventTracker.onLoginWithFacebook(user);
    }

    if (type === AuthSuccessTypeEnum.signInWithGoogle) {
      authTracker.onSuccessLoginWithGoogle(eventLabel);
      user && tealiumUserEventTracker.onLoginWithGoogle(user);
    }

    if (type === AuthSuccessTypeEnum.registerWithEmail) {
      user && tealiumUserEventTracker.onRegisterWithEmail(user);
    }

    success();
  };

  return (
    <div
      className={styles.content}
      onClick={(e): void => {
        e.stopPropagation();
      }}
    >
      <div className={styles.header}>
        <button
          onClick={(): void => {
            close();
            cancel();
          }}
        >
          <IconThickCrossTemplate class={styles.closeIcon} />
        </button>
      </div>
      {[AuthScreenEnum.login, AuthScreenEnum.shortLogin].includes(authScreen) && (
        <AuthLoginComponent
          onClose={close}
          onSuccess={onSuccess}
          onLogin={(): void => setAuthScreen(AuthScreenEnum.login)}
          onRegister={(): void => setAuthScreen(AuthScreenEnum.registration)}
          onForgotPassword={(): void => setAuthScreen(AuthScreenEnum.forgotPassword)}
          onFacebookLoginStart={(): void => authTracker.onOpenLoginWithFacebook(eventLabel)}
          onGoogleLoginStart={(): void => authTracker.onOpenLoginWithGoogle(eventLabel)}
          template={authScreen === AuthScreenEnum.shortLogin ? loginTemplate : undefined}
        />
      )}
      {authScreen === AuthScreenEnum.registration && (
        <AuthRegistrationComponent
          onClose={close}
          onSuccess={onSuccess}
          onLogin={(): void => setAuthScreen(AuthScreenEnum.login)}
        />
      )}
      {authScreen === AuthScreenEnum.forgotPassword && (
        <AuthForgotPasswordComponent
          onClose={close}
          onSuccess={onSuccess}
          onRegister={(): void => setAuthScreen(AuthScreenEnum.registration)}
        />
      )}
    </div>
  );
};
