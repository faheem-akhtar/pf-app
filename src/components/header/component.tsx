import { useContext, useRef } from 'react';
import { useRouter } from 'next/router';

import { useApiContactedProperties } from 'api/contacted-properties/hook';
import { useApiSavedProperties } from 'api/saved-properties/hook';

import { AuthModalComponent } from 'components/auth/modal/component';
import { HeaderTemplate } from './template';
import { ModalComponent } from 'components/modal/component';
import { UserContext } from 'context/user/context';

export const HeaderComponent = (): JSX.Element => {
  const locale = useRouter().locale as string;

  const user = useContext(UserContext);
  const savedPropertiesCountResponse = useApiSavedProperties();
  const savedPropertiesCount = savedPropertiesCountResponse.ok ? savedPropertiesCountResponse.data.length : 0;
  const contactedPropertiesResponse = useApiContactedProperties();

  const openAuthRef = useRef<() => void>(() => null);
  const closeAuthRef = useRef<() => void>(() => null);

  if (contactedPropertiesResponse.ok) {
    // eslint-disable-next-line no-console
    console.log('contacted properties', contactedPropertiesResponse.data);
  }

  return (
    <>
      <HeaderTemplate
        locale={locale}
        userProfile={{
          user,
          savedPropertiesCount,
        }}
        onLoginButtonClick={(): void => {
          openAuthRef.current();
        }}
      />
      <ModalComponent openRef={openAuthRef} closeRef={closeAuthRef}>
        <AuthModalComponent close={(): void => closeAuthRef.current()} />
      </ModalComponent>
    </>
  );
};
