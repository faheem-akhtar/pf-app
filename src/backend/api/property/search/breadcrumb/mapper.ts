import { BreadcrumbInterface } from 'components/property/list/breadcrumb/interface';

import { BackendApiPropertySearchBreadcrumbInterface } from './interface';

export const backendApiPropertySearchBreadcrumbMapper = (
  breadcrumbs: BackendApiPropertySearchBreadcrumbInterface[]
): BreadcrumbInterface[] =>
  breadcrumbs.map((breadcrumb) => ({
    name: breadcrumb.attributes.name,
    link: breadcrumb.links.self,
    count: breadcrumb.meta.count,
  }));
