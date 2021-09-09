import { useContext } from 'react';

import { UserContext } from 'context/user/context';

import { EmailAgentModalSignInComponentPropsInterface } from './component-props.interface';
import { EmailAgentModalSignInTemplate } from './template';

export const EmailAgentModalSignInComponent = (
  props: EmailAgentModalSignInComponentPropsInterface
): JSX.Element | null => {
  const user = useContext(UserContext);

  if (user) return null;

  return <EmailAgentModalSignInTemplate {...props} />;
};
