import { FiltersModalButton } from 'components/filters-modal/button';
import styles from './filters-section.module.scss';

export const FiltersSectionComponent = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <FiltersModalButton />
    </div>
  );
};
