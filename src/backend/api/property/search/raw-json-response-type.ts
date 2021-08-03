export type BackendApiPropertySearchRawJsonResponseType = {
  data: {
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
