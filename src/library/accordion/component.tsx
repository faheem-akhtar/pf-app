import { FunctionComponent, useState } from 'react';

import { IconThinChevronDownTemplate } from 'components/icon';
import { domClassMerge } from 'helpers/dom/class-merge';

import styles from './accordion.module.scss';
import { AccordionComponentPropsInterface } from './component-props.interface';

export const AccordionComponent: FunctionComponent<AccordionComponentPropsInterface> = ({
  expanded = false,
  ...props
}) => {
  const [isExpanded, setIsExpanded] = useState(false || expanded);

  return (
    <div className={styles.accordion}>
      <header className={styles.accordion__header} onClick={(): void => setIsExpanded((isExpanded) => !isExpanded)}>
        <p className={styles.accordion__title}>{props.title}</p>
        <IconThinChevronDownTemplate
          class={domClassMerge(styles.accordion__icon, {
            [styles['accordion__icon--expanded']]: isExpanded,
          })}
          clipped
        />
      </header>

      {isExpanded && props.children}
    </div>
  );
};
