import { LocaleEnum } from 'services/locale/enum';

let locale = LocaleEnum.en;
export const LocaleService = {
  setLocale: (_locale: LocaleEnum): void => {
    locale = _locale;
  },
  getLocale: (): LocaleEnum => locale,
};
