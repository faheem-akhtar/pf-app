import { BackendApiFactory } from 'backend/api/factory';
import { BackendModelSeoContentInterface } from 'backend/model/seo/content.interface';
import { SeoContentInterface } from 'components/seo/content/interface';

import { backendApiSeoContentMapper } from './mapper';

const fetcher = BackendApiFactory<SeoContentInterface | null, BackendModelSeoContentInterface>({
  method: 'GET',
  url: 'seo/content',
  dataMapper: backendApiSeoContentMapper,
});

export const backendApiSeoContentFetcher = (locale: string, uri: string): ReturnType<typeof fetcher> =>
  fetcher({
    locale,
    query: { uri },
  });
