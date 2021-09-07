import { useContext, useRef } from 'react';

import { UserContext } from 'context/user/context';

import { EmailAgentModalSignInComponentPropsInterface } from './component-props.interface';
import { EmailAgentModalSignInTemplate } from './template';

export const EmailAgentModalSignInComponent = (
  props: EmailAgentModalSignInComponentPropsInterface
): JSX.Element | null => {
  const openAuthRef = useRef<() => void>(() => null);
  const closeAuthRef = useRef<() => void>(() => null);

  const user = useContext(UserContext);

  if (user) return null;

  return <EmailAgentModalSignInTemplate {...props} openAuthRef={openAuthRef} closeAuthRef={closeAuthRef} />;
};
