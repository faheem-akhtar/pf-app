import { WrapperTemplate } from 'components/wrapper/template';

import styles from '../property-list.module.scss';

export const PropertyListHeadingComponent = ({ pageTitle }: { pageTitle: string }): JSX.Element => {
  const title = pageTitle.split('-')[0];

  return (
    <WrapperTemplate className={styles.heading}>
      <h1 className={styles.title}>{title}</h1>
    </WrapperTemplate>
  );
};
