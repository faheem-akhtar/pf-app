import { useRouter } from 'next/router';
import { FunctionComponent, useContext } from 'react';

import { FiltersContext } from 'components/filters/context';

import { PropertyListBreadcrumbComponentPropsInterface } from './component-props.interface';
import { breadcrumbMapQueryToFilters } from './map-query-to-filters';
import { PropertyListBreadcrumbTemplate } from './template';
import { PropertyListBreadcrumbTemplatePropsInterface } from './template-props.interface';

export const PropertyListBreadcrumbComponent: FunctionComponent<PropertyListBreadcrumbComponentPropsInterface> = (
  props
) => {
  const locale = useRouter().locale as string;
  const filtersCtx = useContext(FiltersContext);

  const onClick: PropertyListBreadcrumbTemplatePropsInterface['onClick'] = (event) => {
    event.preventDefault();
    filtersCtx.change((filtersValue) => ({
      ...filtersValue,
      ...breadcrumbMapQueryToFilters(locale, props.link),
    }));
  };

  return <PropertyListBreadcrumbTemplate {...props} onClick={onClick} />;
};
