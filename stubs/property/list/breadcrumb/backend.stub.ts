import { BackendApiPropertySearchBreadcrumbInterface } from 'backend/api/property/search/breadcrumb/interface';

export const propertyListBreadcrumbBackendStub = (
  breadcrumbs: Partial<BackendApiPropertySearchBreadcrumbInterface[]> = []
): BackendApiPropertySearchBreadcrumbInterface[] => {
  const defaultBreadcrumbs = [
    {
      type: 'breadcrumb_item',
      id: '618262515c52a',
      attributes: {
        name: 'Apartments',
      },
      links: {
        self: '/en/search?t=1&c=1',
      },
      meta: {
        count: 4879,
      },
    },
    {
      type: 'breadcrumb_item',
      id: '618262515c544',
      attributes: {
        name: 'Land',
      },
      links: {
        self: '/en/search?t=5&c=1',
      },
      meta: {
        count: 894,
      },
    },
    {
      type: 'breadcrumb_item',
      id: '618262515c54b',
      attributes: {
        name: 'Duplexes',
      },
      links: {
        self: '/en/search?t=24&c=1',
      },
      meta: {
        count: 445,
      },
    },
    {
      type: 'breadcrumb_item',
      id: '618262515c550',
      attributes: {
        name: 'Chalets',
      },
      links: {
        self: '/en/search?t=44&c=1',
      },
      meta: {
        count: 170,
      },
    },
    {
      type: 'breadcrumb_item',
      id: '618262515c554',
      attributes: {
        name: 'Villas',
      },
      links: {
        self: '/en/search?t=35&c=1',
      },
      meta: {
        count: 160,
      },
    },
    {
      type: 'breadcrumb_item',
      id: '618262515c559',
      attributes: {
        name: 'Whole Buildings',
      },
      links: {
        self: '/en/search?t=10&c=1',
      },
      meta: {
        count: 38,
      },
    },
  ];

  return [...defaultBreadcrumbs, ...(breadcrumbs as unknown as BackendApiPropertySearchBreadcrumbInterface[])];
};
