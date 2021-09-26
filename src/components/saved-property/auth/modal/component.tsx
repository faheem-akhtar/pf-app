import React, { useState } from 'react';

import { AuthForgotPasswordComponent } from 'components/auth/forgot-password/component';
import { AuthLoginComponent } from 'components/auth/login/component';
import { AuthRegistrationComponent } from 'components/auth/registration/component';
import { IconThickCrossTemplate } from 'components/icon/thick/cross-template';

import { SavedPropertyAuthLoginTemplate } from '../login/template';
import { SavedPropertyAuthScreenEnum } from '../screen.enum';
import { SavedPropertyAuthModalPropsInterface } from './props.interface';
import styles from './saved-property-auth-modal.module.scss';

export const SavedPropertyAuthModalComponent = ({ onClose }: SavedPropertyAuthModalPropsInterface): JSX.Element => {
  const [authScreen, setAuthScreen] = useState(SavedPropertyAuthScreenEnum.default);

  return (
    <div
      className={styles.content}
      onClick={(e): void => {
        e.stopPropagation();
      }}
    >
      <div className={styles.header}>
        <div onClick={onClose} data-testid='auth-close-icon'>
          <IconThickCrossTemplate class={styles.closeIcon} />
        </div>
      </div>
      {[SavedPropertyAuthScreenEnum.default, SavedPropertyAuthScreenEnum.login].includes(authScreen) && (
        <AuthLoginComponent
          onClose={onClose}
          onSuccess={onClose}
          onLogin={(): void => setAuthScreen(SavedPropertyAuthScreenEnum.login)}
          onRegister={(): void => setAuthScreen(SavedPropertyAuthScreenEnum.registration)}
          onForgotPassword={(): void => setAuthScreen(SavedPropertyAuthScreenEnum.forgotPassword)}
          template={authScreen === SavedPropertyAuthScreenEnum.default ? SavedPropertyAuthLoginTemplate : undefined}
        />
      )}
      {authScreen === SavedPropertyAuthScreenEnum.registration && (
        <AuthRegistrationComponent
          onClose={onClose}
          onSuccess={onClose}
          onLogin={(): void => setAuthScreen(SavedPropertyAuthScreenEnum.login)}
        />
      )}
      {authScreen === SavedPropertyAuthScreenEnum.forgotPassword && (
        <AuthForgotPasswordComponent
          onClose={onClose}
          onSuccess={onClose}
          onRegister={(): void => setAuthScreen(SavedPropertyAuthScreenEnum.registration)}
        />
      )}
    </div>
  );
};
