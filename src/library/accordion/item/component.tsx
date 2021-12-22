import { FunctionComponent, useState } from 'react';

import { IconThinChevronDownTemplate } from 'components/icon';
import { domClassMerge } from 'helpers/dom/class-merge';

import styles from './accordion-item.module.scss';
import { AccordionItemComponentPropsInterface } from './component-props.interface';

export const AccordionItemComponent: FunctionComponent<AccordionItemComponentPropsInterface> = ({
  expanded = false,
  children,
  title,
}) => {
  const [isExpanded, setIsExpanded] = useState(false || expanded);

  return (
    <div className={styles.container}>
      <header className={styles.header} onClick={(): void => setIsExpanded((isExpanded) => !isExpanded)}>
        <p className={styles.title}>{title}</p>
        <IconThinChevronDownTemplate
          class={domClassMerge(styles.icon, {
            [styles['icon--expanded']]: isExpanded,
          })}
          clipped
        />
      </header>

      {isExpanded && <div className={styles.panel}>{children}</div>}
    </div>
  );
};
