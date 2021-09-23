import React, { useState } from 'react';

import { AuthForgotPasswordComponent } from 'components/auth/forgot-password/component';
import { AuthLoginComponent } from 'components/auth/login/component';
import { AuthRegistrationComponent } from 'components/auth/registration/component';
import { AuthScreenEnum } from 'components/auth/screen.enum';
import { IconThickCrossTemplate } from 'components/icon/thick/cross-template';
import { functionNoop } from 'helpers/function/noop';

import styles from './auth-modal-component.module.scss';
import { AuthModalPropsInterface } from './props.interface';

export const AuthModalComponent = ({
  close = functionNoop,
  cancel = functionNoop,
  success = functionNoop,
}: AuthModalPropsInterface): JSX.Element => {
  const [authScreen, setAuthScreen] = useState(AuthScreenEnum.login);
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
          onSuccess={success}
          onRegister={(): void => setAuthScreen(AuthScreenEnum.registration)}
          onForgotPassword={(): void => setAuthScreen(AuthScreenEnum.forgotPassword)}
        />
      )}
      {authScreen === AuthScreenEnum.registration && (
        <AuthRegistrationComponent
          onClose={close}
          onSuccess={success}
          onLogin={(): void => setAuthScreen(AuthScreenEnum.login)}
        />
      )}
      {authScreen === AuthScreenEnum.forgotPassword && (
        <AuthForgotPasswordComponent
          onClose={close}
          onSuccess={success}
          onRegister={(): void => setAuthScreen(AuthScreenEnum.registration)}
        />
      )}
    </div>
  );
};
