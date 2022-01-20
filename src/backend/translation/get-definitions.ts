// eslint-disable-next-line @propertyfinder/rules/forbid-import
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const { NEXT_PUBLIC_COUNTRY_CODE } = process.env;

/**
 * @param locale lang
 * @returns country-specific and the common translation definitions
 */
// TODO-FE[TPNX-3016] Add tests
export const backendTranslationGetDefinitions = (locale: string): ReturnType<typeof serverSideTranslations> =>
  serverSideTranslations(locale, ['common', <string>NEXT_PUBLIC_COUNTRY_CODE]);
