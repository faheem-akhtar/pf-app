import React, { FunctionComponent, useContext, useEffect, useRef } from 'react';

import { AuthModalComponent } from 'components/auth/modal/component';
import { ModalComponent } from 'components/modal/component';
import { SaveSearchContext } from 'components/save-search/context';
import { saveSearchTracker } from 'components/save-search/tracker';
import { UserContext } from 'components/user/context';
import { functionNoop } from 'helpers/function/noop';
import { AuthService } from 'services/auth/service';
import { AuthSubscribeEventTypeEnum } from 'services/auth/subscribe-event-type.enum';
import { AuthSubscriberType } from 'services/auth/subscriber.type';

import { SaveSearchModalAuthPropsInterface } from './props.interface';

export const SaveSearchModalAuthComponent: FunctionComponent<SaveSearchModalAuthPropsInterface> = ({
  onCancel,
  onSuccess,
}) => {
  const user = useContext(UserContext);
  const saveSearch = useContext(SaveSearchContext);

  const openLoginRef = useRef(functionNoop);
  const closeLoginRef = useRef(functionNoop);

  useEffect(() => {
    const onUpdate: AuthSubscriberType = (newUser, meta) => {
      if (newUser && meta?.eventType === AuthSubscribeEventTypeEnum.login) {
        saveSearchTracker.onSignInSuccess();
      }
      if (newUser && meta?.eventType === AuthSubscribeEventTypeEnum.register) {
        saveSearchTracker.onSignUpSuccess();
      }
    };
    const unsubscribeAuth = AuthService.subscribe(onUpdate);

    openLoginRef.current();

    return (): void => unsubscribeAuth();
  });

  useEffect(() => {
    if (user && saveSearch.ok) {
      onSuccess();
    }
  }, [user, saveSearch.ok, onSuccess]);

  return (
    <ModalComponent openRef={openLoginRef} closeRef={closeLoginRef} overlay>
      <AuthModalComponent cancel={onCancel} />
    </ModalComponent>
  );
};
