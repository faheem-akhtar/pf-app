import { useRouter } from 'next/router';
import { useState } from 'react';

import { HeaderTemplate } from './template';

export const HeaderComponent = (): JSX.Element => {
  const { locale } = useRouter();
  // TODO-FE[TPNX-1946] Login service should be replaced
  const [userProfile, setUserProfile] = useState<{
    image: string;
    savedPropertiesCount: number;
  }>();

  return (
    <HeaderTemplate
      locale={locale}
      userProfile={userProfile}
      onLoginButtonClick={(): void => setUserProfile({ image: '', savedPropertiesCount: 5 })}
    />
  );
};
