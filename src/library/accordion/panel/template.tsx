import { FunctionComponent } from 'react';

import styles from '../accordion.module.scss';
import { AccordionPanelTemplatePropsInterface } from './template-props.interface';

export const AccordionPanelTemplate: FunctionComponent<AccordionPanelTemplatePropsInterface> = ({
  listItem = false,
  children,
}) => {
  const Component = listItem ? 'li' : 'div';

  return (
    <Component className={styles.accordion__panel} role={listItem ? 'listitem' : undefined}>
      {children}
    </Component>
  );
};
