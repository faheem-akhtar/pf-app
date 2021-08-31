import React from 'react';
import styles from './property-list.module.scss';

export const PropertyListAdPlaceholderTemplate: React.FunctionComponent<{ id: string }> = ({ id }) => (
  <div className={styles.ad_placeholder} data-testid='list-item'>
    <div data-ad className={styles.ad} id={id} />
  </div>
);
