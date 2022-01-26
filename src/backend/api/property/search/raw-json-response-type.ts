import { BackendApiPropertySearchBreadcrumbInterface } from './breadcrumb/interface';

export type BackendApiPropertySearchRawJsonResponseType = {
  data: {
    meta: {
      breadcrumbs: BackendApiPropertySearchBreadcrumbInterface[];
    };
    relationships: {
      properties: {
        meta: {
          page_count: number;
          total_count: number;
        };
      };
    };
  };
};
