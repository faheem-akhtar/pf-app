import { FunctionComponent } from 'react';

import { domClassMerge } from 'helpers/dom/class-merge';
import { SkeletonTemplate } from 'library/skeleton/template';

import { propertyCardVariantsModernIsActive } from '../variants/modern/is-active';
import styles from './property-card-loading-skeleton.module.scss';
import { PropertyCardLoadingSkeletonTemplatePropsInterface } from './template-props.interface';

export const PropertyCardLoadingSkeletonTemplate: FunctionComponent<PropertyCardLoadingSkeletonTemplatePropsInterface> =
  ({ cardType }) => {
    const body = propertyCardVariantsModernIsActive(cardType) ? (
      <>
        <header className={styles.header}>
          <SkeletonTemplate width='100%' height='100%' />
        </header>
        <main className={styles.content}>
          <SkeletonTemplate width='6rem' height='1.6rem' class={styles.skeleton} />
          <SkeletonTemplate width='11rem' height='2.4rem' class={styles.skeleton} />
          <SkeletonTemplate width='95%' height='2.1rem' class={styles.skeleton} />
          <SkeletonTemplate width='95%' height='1.6rem' class={styles.skeleton} />
          <SkeletonTemplate width='15rem' height='1.6rem' class={styles.skeleton} />
        </main>
        <footer className={styles.footer}>
          <SkeletonTemplate width='15rem' height='1.6rem' class={styles.skeleton} />
          <SkeletonTemplate width='11.9rem' height='3.6rem' class={styles.skeleton} />
        </footer>
      </>
    ) : (
      <>
        <SkeletonTemplate width='12.4rem' height='14.8rem' class={styles.skeleton} />
        <main className={styles.content}>
          <SkeletonTemplate width='13.5rem' height='2.4rem' class={styles.skeleton} />
          <SkeletonTemplate width='100%' height='4.2rem' class={styles.skeleton} />
          <SkeletonTemplate width='20rem' height='1.6rem' class={styles.skeleton} />
          <SkeletonTemplate width='16.7rem' height='1.6rem' class={styles.skeleton} />
          <SkeletonTemplate width='100%' height='3.2rem' class={styles.skeleton} />
        </main>
      </>
    );

    return (
      <div className={domClassMerge(styles.container, { [styles[`container--${cardType}`]]: !!cardType })}>{body}</div>
    );
  };
