import React, { useState } from 'react';
import { AuthForgotPasswordComponent } from 'components/auth/forgot-password/component';
import { AuthLoginComponent } from 'components/auth/login/component';
import { AuthRegistrationComponent } from 'components/auth/registration/component';
import { AuthScreenEnum } from 'components/auth/screen.enum';
import { IconThickCrossTemplate } from 'components/icon/thick/cross-template';

import styles from './auth-modal-component.module.scss';

export const AuthModalComponent = ({ close }: { close: () => void }): JSX.Element => {
  const [authScreen, setAuthScreen] = useState(AuthScreenEnum.login);
  return (
    <div
      className={styles.content}
      onClick={(e): void => {
        e.stopPropagation();
      }}
    >
      <div className={styles.header}>
        <div onClick={close}>
          <IconThickCrossTemplate class={styles.closeIcon} />
        </div>
      </div>
      {authScreen === AuthScreenEnum.login && (
        <AuthLoginComponent
          onClose={close}
          onRegister={(): void => setAuthScreen(AuthScreenEnum.registration)}
          onForgotPassword={(): void => setAuthScreen(AuthScreenEnum.forgotPassword)}
        />
      )}
      {authScreen === AuthScreenEnum.registration && (
        <AuthRegistrationComponent onClose={close} onLogin={(): void => setAuthScreen(AuthScreenEnum.login)} />
      )}
      {authScreen === AuthScreenEnum.forgotPassword && (
        <AuthForgotPasswordComponent
          onClose={close}
          onRegister={(): void => setAuthScreen(AuthScreenEnum.registration)}
        />
      )}
    </div>
  );
};
