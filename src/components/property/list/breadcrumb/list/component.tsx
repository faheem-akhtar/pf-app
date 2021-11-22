import { FunctionComponent } from 'react';

import { IconThinChevronDownTemplate } from 'components/icon';
import { domClassMerge } from 'helpers/dom/class-merge';
import { ButtonComponentTypeEnum } from 'library/button/component-type.enum';
import { ButtonIconPositionEnum } from 'library/button/icon-position.enum';
import { ButtonSizeEnum } from 'library/button/size.enum';
import { ButtonTemplate } from 'library/button/template';

import { PropertyListBreadcrumbComponent } from '../component';
import styles from '../property-list-breadcrumb.module.scss';
import { PropertyListBreadcrumbListComponentPropsInterface } from './component-props.interface';
import { propertyListBreadcrumbListItemsVisibleCount } from './items-visible-count';

export const PropertyListBreadcrumbListComponent: FunctionComponent<PropertyListBreadcrumbListComponentPropsInterface> =
  ({ breadcrumbs, onClickShowMore, expanded, t }) => (
    <section role='section' className={styles.breadcrumb}>
      <ul role='list' className={styles.breadcrumb__list}>
        {breadcrumbs.slice(0, propertyListBreadcrumbListItemsVisibleCount).map((breadcrumb) => (
          <PropertyListBreadcrumbComponent key={breadcrumb.name} {...breadcrumb} />
        ))}

        {breadcrumbs.length > propertyListBreadcrumbListItemsVisibleCount && (
          <li role='listitem'>
            <ButtonTemplate
              className={styles.breadcrumb__button}
              type='button'
              componentType={ButtonComponentTypeEnum.secondaryBlue}
              size={ButtonSizeEnum.small}
              onClick={onClickShowMore}
              icon={{
                component: IconThinChevronDownTemplate,
                position: ButtonIconPositionEnum.right,
                className: domClassMerge(styles.breadcrumb__icon, {
                  [styles['breadcrumb__icon--expanded']]: expanded,
                }),
              }}
            >
              {t(expanded ? 'show-less' : 'show-more')}
            </ButtonTemplate>
          </li>
        )}
      </ul>

      <ul
        className={domClassMerge(styles.breadcrumb__list, styles['breadcrumb__list--more'], {
          [styles['breadcrumb__list--expanded']]: expanded,
        })}
      >
        {breadcrumbs.slice(propertyListBreadcrumbListItemsVisibleCount, breadcrumbs.length).map((breadcrumb) => (
          <PropertyListBreadcrumbComponent
            key={breadcrumb.name}
            class={styles['breadcrumb__item--more']}
            {...breadcrumb}
          />
        ))}
      </ul>
    </section>
  );
