import { Children, Fragment, ReactElement, ReactFragment, ReactNode } from 'react';

/**
 * Convert props.children value to flattened array. Will remove the Fragment if present
 */
export function domToChildArray<P extends {} = {}>(
  children: ReactNode,
  predicate: (value: ReactElement<P>, index: number, array: Array<ReactElement<P>>) => boolean = (): boolean => true
): Array<Exclude<ReactNode, boolean | null | undefined | ReactFragment>> {
  return Children.toArray(children)
    .reduce<ReturnType<typeof domToChildArray>>(
      (acc, item) =>
        acc.concat((item as ReactElement)?.type === Fragment ? (item as ReactElement).props.children : item),
      [] as ReturnType<typeof domToChildArray>
    )
    .filter(predicate);
}
