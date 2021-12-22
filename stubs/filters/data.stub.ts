import filtersData from 'public/static/filters-data';

import { FiltersDataInterface } from 'components/filters/data/interface';

export const filtersDataStub = (locale: 'en' | 'ar' = 'en'): FiltersDataInterface =>
  filtersData[locale] as unknown as FiltersDataInterface;
