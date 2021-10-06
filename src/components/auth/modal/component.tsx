import React, { useEffect, useState } from 'react';

import { AuthForgotPasswordComponent } from 'components/auth/forgot-password/component';
import { AuthLoginComponent } from 'components/auth/login/component';
import { AuthRegistrationComponent } from 'components/auth/registration/component';
import { AuthScreenEnum } from 'components/auth/screen.enum';
import { IconThickCrossTemplate } from 'components/icon/thick/cross-template';
import { functionNoop } from 'helpers/function/noop';

import { AuthSuccessTypeEnum } from '../success-type.enum';
import { authTracker } from '../tracker';
import styles from './auth-modal-component.module.scss';
import { AuthModalPropsInterface } from './props.interface';

// TODO[CX-751] - combine it with SavedPropertyAuthModalComponent
export const AuthModalComponent = ({
  close = functionNoop,
  cancel = functionNoop,
  success = functionNoop,
}: AuthModalPropsInterface): JSX.Element => {
  const [authScreen, setAuthScreen] = useState(AuthScreenEnum.login);

  useEffect(() => {
    if (authScreen === AuthScreenEnum.login) {
      authTracker.onOpenLoginForm('Header');
    }

    if (authScreen === AuthScreenEnum.registration) {
      authTracker.onOpenRegisterForm('Header');
    }

    if (authScreen === AuthScreenEnum.forgotPassword) {
      authTracker.onOpenForgotPasswordForm('Header');
    }
  }, [authScreen]);

  const onSuccess = (type?: AuthSuccessTypeEnum): void => {
    if (type === AuthSuccessTypeEnum.signInWithEmail) {
      authTracker.onSuccessLoginWithEmail('Header');
    }

    if (type === AuthSuccessTypeEnum.signInWithFacebook) {
      authTracker.onSuccessLoginWithFacebook('Header');
    }

    if (type === AuthSuccessTypeEnum.signInWithGoogle) {
      authTracker.onSuccessLoginWithGoogle('Header');
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
      {authScreen === AuthScreenEnum.login && (
        <AuthLoginComponent
          onClose={close}
          onSuccess={onSuccess}
          onRegister={(): void => setAuthScreen(AuthScreenEnum.registration)}
          onForgotPassword={(): void => setAuthScreen(AuthScreenEnum.forgotPassword)}
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
