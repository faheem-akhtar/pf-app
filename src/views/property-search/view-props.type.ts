import { FiltersDataInterface } from 'components/filters/data/interface';

export type PropertySearchComponentPropsType =
  | {
      ok: true;
      filtersData: FiltersDataInterface;
    }
  | {
      ok: false;
      error: string;
    };
