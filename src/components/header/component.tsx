import { useContext, useRef } from 'react';
import { useRouter } from 'next/router';

import { useApiContactedProperties } from 'api/contacted-properties/hook';

import { AuthModalComponent } from 'components/auth/modal/component';
import { HeaderTemplate } from './template';
import { ModalComponent } from 'components/modal/component';
import { SavePropertyContext } from 'components/save-property/context';
import { UserContext } from 'context/user/context';

// TODO-FE[CX-424] Add tests
export const HeaderComponent = (): JSX.Element => {
  const locale = useRouter().locale as string;

  const user = useContext(UserContext);
  const saveProperty = useContext(SavePropertyContext);
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
          savedPropertiesCount: saveProperty.propertyIds.length,
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
