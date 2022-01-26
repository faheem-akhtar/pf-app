import { FunctionComponent } from 'react';

import styles from './ad.module.scss';

export const AdComponent: FunctionComponent<{ id: string }> = ({ id }) => <div data-ad className={styles.ad} id={id} />;
