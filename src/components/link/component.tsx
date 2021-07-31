import Link from 'next/link';

import { LinkComponentPropsInterface } from './component.props.interface';

const NextLink: (props: LinkComponentPropsInterface) => JSX.Element = Link as (
  props: LinkComponentPropsInterface
) => JSX.Element;

export const LinkComponent = ({ href, children, locale }: LinkComponentPropsInterface): JSX.Element => (
  <NextLink href={href} locale={locale}>
    {children}
  </NextLink>
);
