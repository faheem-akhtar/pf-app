import { useRouter } from 'next/router';
import { useContext, useRef } from 'react';

import { AuthModalComponent } from 'components/auth/modal/component';
import { ModalComponent } from 'components/modal/component';
import { SavedPropertyContext } from 'components/saved-property/context';
import { UserContext } from 'context/user/context';

import { HeaderTemplate } from './template';

export const HeaderComponent = (): JSX.Element => {
  const locale = useRouter().locale as string;

  const user = useContext(UserContext);
  const saveProperty = useContext(SavedPropertyContext);

  const openAuthRef = useRef<() => void>(null) as React.MutableRefObject<() => void>;
  const closeAuthRef = useRef<() => void>(null) as React.MutableRefObject<() => void>;

  return (
    <>
      <HeaderTemplate
        locale={locale}
        userProfile={{
          user,
          savedPropertiesCount: saveProperty.data.length,
        }}
        onLoginButtonClick={(): void => {
          openAuthRef.current();
        }}
      />
      <ModalComponent openRef={openAuthRef} closeRef={closeAuthRef} overlay>
        <AuthModalComponent close={(): void => closeAuthRef.current()} />
      </ModalComponent>
    </>
  );
};
