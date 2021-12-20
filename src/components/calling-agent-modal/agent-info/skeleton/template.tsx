import { SkeletonTemplate } from 'library/skeleton/template';

import styles from './calling-agent-modal-agent-info-skeleton.module.scss';

export const CallingAgentModalAgentInfoSkeletonTemplate = (): JSX.Element => (
  <div className={styles.container}>
    <SkeletonTemplate width='7.04rem' height='7.04rem' class={styles['skeleton--image']} />

    <div className={styles.content}>
      <SkeletonTemplate width='8rem' height='2.4rem' class={styles.skeleton} />
      <SkeletonTemplate width='100%' height='2.5rem' class={styles.skeleton} />
    </div>
  </div>
);
