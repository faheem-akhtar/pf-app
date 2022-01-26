import { BackendModelSeoLinksInterface } from 'backend/model/seo/links.interface';
import { SeoLinksInterface } from 'components/seo/links/interface';

export const backendApiSeoLinksMapper = (data: BackendModelSeoLinksInterface): SeoLinksInterface => ({
  ...(data.popular_searches && {
    popularSearches: {
      title: data.popular_searches.title,
      links: data.popular_searches.links.map((link) => ({
        title: link.title,
        path: link.path,
      })),
    },
  }),
  ...(data.nearby_areas && {
    nearbyAreas: {
      title: data.nearby_areas.title,
      links: data.nearby_areas.links.map((link) => ({
        title: link.title,
        path: link.path,
      })),
    },
  }),
  ...(data.alternate_category && {
    alternateCategory: {
      title: data.alternate_category.title,
      links: data.alternate_category.links.map((link) => ({
        title: link.title,
        path: link.path,
      })),
    },
  }),
});
