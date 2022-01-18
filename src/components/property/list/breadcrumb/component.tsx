import { FunctionComponent, useContext } from 'react';

import { FiltersContext } from 'components/filters/context';

import { PropertyListBreadcrumbComponentPropsInterface } from './component-props.interface';
import { breadcrumbMapQueryToFilters } from './map-query-to-filters';
import { PropertyListBreadcrumbTemplate } from './template';
import { PropertyListBreadcrumbTemplatePropsInterface } from './template-props.interface';

export const PropertyListBreadcrumbComponent: FunctionComponent<PropertyListBreadcrumbComponentPropsInterface> = (
  props
) => {
  const filtersCtx = useContext(FiltersContext);

  const onClick: PropertyListBreadcrumbTemplatePropsInterface['onClick'] = (event) => {
    event.preventDefault();

    filtersCtx.change((filtersValue) => ({
      ...filtersValue,
      ...breadcrumbMapQueryToFilters(props.link),
    }));
  };

  return <PropertyListBreadcrumbTemplate {...props} onClick={onClick} />;
};
