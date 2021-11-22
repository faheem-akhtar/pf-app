import Link from 'next/link';
import { FunctionComponent } from 'react';

import { LinkComponentPropsInterface } from './component.props.interface';

export const LinkComponent: FunctionComponent<LinkComponentPropsInterface> = (props) => {
  const { href, locale, ...rest } = props;

  return (
    <Link href={href} locale={locale} {...rest}>
      {props.children}
    </Link>
  );
};
