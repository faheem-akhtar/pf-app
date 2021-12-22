import { BackendModelSeoLinksInterface } from 'backend/model/seo/links.interface';

export const seoBackendStub = (
  data: Partial<BackendModelSeoLinksInterface> = {}
): Partial<BackendModelSeoLinksInterface> => ({
  popular_searches: {
    title: 'Popular searches',
    links: [
      {
        title: 'Apartments for sale',
        path: '/en/buy/apartments-for-sale.html',
      },
      {
        title: 'Properties for sale in Dubai',
        path: '/en/buy/dubai/properties-for-sale.html',
      },
    ],
  },
  nearby_areas: {
    title: 'Nearby Areas',
    links: [
      {
        title: 'Properties for rent in Dubai',
        path: '/en/rent/dubai/properties-for-rent.html',
      },
      {
        title: 'Properties for rent in Abu Dhabi',
        path: '/en/rent/abu-dhabi/properties-for-rent.html',
      },
    ],
  },
  alternate_category: {
    title: 'Properties for Sale',
    links: [
      {
        title: 'Properties for sale',
        path: '/en/buy/properties-for-sale.html',
      },
    ],
  },
  ...data,
});
