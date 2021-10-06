import React, { useEffect, useState } from 'react';

import { AuthForgotPasswordComponent } from 'components/auth/forgot-password/component';
import { AuthLoginComponent } from 'components/auth/login/component';
import { AuthRegistrationComponent } from 'components/auth/registration/component';
import { AuthSuccessTypeEnum } from 'components/auth/success-type.enum';
import { IconThickCrossTemplate } from 'components/icon/thick/cross-template';
import { savedPropertyTracker } from 'components/saved-property/tracker';

import { SavedPropertyAuthLoginTemplate } from '../login/template';
import { SavedPropertyAuthScreenEnum } from '../screen.enum';
import { SavedPropertyAuthModalPropsInterface } from './props.interface';
import styles from './saved-property-auth-modal.module.scss';

// TODO[CX-751] - combine it with AuthModalComponent
export const SavedPropertyAuthModalComponent = ({ onClose }: SavedPropertyAuthModalPropsInterface): JSX.Element => {
  const [authScreen, setAuthScreen] = useState(SavedPropertyAuthScreenEnum.default);

  useEffect(() => {
    if (authScreen === SavedPropertyAuthScreenEnum.login) {
      savedPropertyTracker.onOpenLoginForm();
    }

    if (authScreen === SavedPropertyAuthScreenEnum.registration) {
      savedPropertyTracker.onOpenRegisterForm();
    }

    if (authScreen === SavedPropertyAuthScreenEnum.forgotPassword) {
      savedPropertyTracker.onOpenForgotPasswordForm();
    }
  }, [authScreen]);

  const onSuccess = (type?: AuthSuccessTypeEnum): void => {
    if (type === AuthSuccessTypeEnum.signInWithEmail) {
      savedPropertyTracker.onSuccessLoginWithEmail();
    }

    if (type === AuthSuccessTypeEnum.signInWithFacebook) {
      savedPropertyTracker.onSuccessLoginWithFacebook();
    }

    if (type === AuthSuccessTypeEnum.signInWithGoogle) {
      savedPropertyTracker.onSuccessLoginWithGoogle();
    }

    onClose();
  };

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
          onSuccess={onSuccess}
          onLogin={(): void => setAuthScreen(SavedPropertyAuthScreenEnum.login)}
          onRegister={(): void => setAuthScreen(SavedPropertyAuthScreenEnum.registration)}
          onForgotPassword={(): void => setAuthScreen(SavedPropertyAuthScreenEnum.forgotPassword)}
          onFacebookLoginStart={(): void => savedPropertyTracker.onOpenLoginWithFacebook()}
          onGoogleLoginStart={(): void => savedPropertyTracker.onOpenLoginWithGoogle()}
          template={authScreen === SavedPropertyAuthScreenEnum.default ? SavedPropertyAuthLoginTemplate : undefined}
        />
      )}
      {authScreen === SavedPropertyAuthScreenEnum.registration && (
        <AuthRegistrationComponent
          onClose={onClose}
          onSuccess={onSuccess}
          onLogin={(): void => setAuthScreen(SavedPropertyAuthScreenEnum.login)}
        />
      )}
      {authScreen === SavedPropertyAuthScreenEnum.forgotPassword && (
        <AuthForgotPasswordComponent
          onClose={onClose}
          onSuccess={onSuccess}
          onRegister={(): void => setAuthScreen(SavedPropertyAuthScreenEnum.registration)}
        />
      )}
    </div>
  );
};
