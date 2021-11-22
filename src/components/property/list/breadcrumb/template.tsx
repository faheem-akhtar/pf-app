import { FunctionComponent } from 'react';

import { LinkComponent } from 'components/link/component';
import { domClassMerge } from 'helpers/dom/class-merge';
import { numberFormat } from 'helpers/number/format';

import styles from './property-list-breadcrumb.module.scss';
import { PropertyListBreadcrumbTemplatePropsInterface } from './template-props.interface';

export const PropertyListBreadcrumbTemplate: FunctionComponent<PropertyListBreadcrumbTemplatePropsInterface> = (
  props
) => (
  <li role='listitem' className={domClassMerge(styles.breadcrumb__item, props.class)}>
    <LinkComponent href={props.link}>
      <a className={styles.breadcrumb__link} onClick={props.onClick}>
        {props.name}
        {props.count && <span className={styles.breadcrumb__count}>({numberFormat(props.count)})</span>}
      </a>
    </LinkComponent>
  </li>
);
