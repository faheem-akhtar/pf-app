import { BackendApiPropertySearchBreadcrumbResultType } from './breadcrumb/result.type';

export type BackendApiPropertySearchRawJsonResponseType = {
  data: {
    meta: {
      breadcrumbs: BackendApiPropertySearchBreadcrumbResultType[];
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
