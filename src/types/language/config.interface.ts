import { LanguageCodeEnum } from '../../enums/language/code.enum';

export interface LanguageConfigInterface {
  /**
   * current language code
   */
  current: LanguageCodeEnum;

  /**
   * alternative language code
   */
  alternative: LanguageCodeEnum;
}
