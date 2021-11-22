import { BreadcrumbInterface } from 'components/property/list/breadcrumb/interface';

export const propertyListBreadcrumbStub = (breadcrumbs: Partial<BreadcrumbInterface[]> = []): BreadcrumbInterface[] => {
  const defaultBreadcrumbs = [
    {
      name: 'Apartments',
      link: '/en/search?t=1&c=1',
      count: 4879,
    },
    {
      name: 'Land',
      link: '/en/search?t=5&c=1',
      count: 894,
    },
    {
      name: 'Duplexes',
      link: '/en/search?t=24&c=1',
      count: 445,
    },
    {
      name: 'Chalets',
      link: '/en/search?t=44&c=1',
      count: 170,
    },
    {
      name: 'Villas',
      link: '/en/search?t=35&c=1',
      count: 160,
    },
    {
      name: 'Whole Buildings',
      link: '/en/search?t=10&c=1',
      count: 38,
    },
  ];

  return [...defaultBreadcrumbs, ...(breadcrumbs as unknown as BreadcrumbInterface[])];
};
