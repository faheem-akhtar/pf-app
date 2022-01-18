import { LanguageCodeEnum } from 'enums/language/code.enum';

export interface LanguageSelectorTemplatePropsInterface {
  /**
   * Locale
   */
  targetLocale: LanguageCodeEnum;

  /**
   * Label
   */
  label: string;

  /**
   * The path (including the query) shown in the browser
   */
  path: string;
}
