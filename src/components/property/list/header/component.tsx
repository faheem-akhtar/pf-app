import { FunctionComponent, useState } from 'react';

import { WrapperTemplate } from 'components/wrapper/template';
import { useTranslation } from 'helpers/translation/hook';

import { PropertyListBreadcrumbListComponent } from '../breadcrumb/list/component';
import { PropertyListHeaderComponentPropsInterface } from './component-props.interface';
import styles from './property-list-header.module.scss';

export const PropertyListHeaderComponent: FunctionComponent<PropertyListHeaderComponentPropsInterface> = (props) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const pageTitle = props.pageTitle.split('-')[0];

  return (
    <WrapperTemplate className={styles.heading}>
      <>
        <h1 className={styles.title}>{pageTitle}</h1>

        {props.breadcrumbs.length ? (
          <PropertyListBreadcrumbListComponent
            breadcrumbs={props.breadcrumbs}
            onClickShowMore={(): void => setIsExpanded((isExpanded) => !isExpanded)}
            expanded={isExpanded}
            t={t}
          />
        ) : null}
      </>
    </WrapperTemplate>
  );
};
