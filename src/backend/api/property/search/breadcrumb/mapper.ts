import { BreadcrumbInterface } from 'components/property/list/breadcrumb/interface';

import { BackendApiPropertySearchBreadcrumbResultType } from './result.type';

export const backendApiPropertySearchBreadcrumbMapper = (
  breadcrumbs: BackendApiPropertySearchBreadcrumbResultType[]
): BreadcrumbInterface[] =>
  breadcrumbs.map((breadcrumb) => ({
    name: breadcrumb.attributes.name,
    link: breadcrumb.links.self,
    count: breadcrumb.meta.count,
  }));
