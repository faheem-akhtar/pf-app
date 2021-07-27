interface PrefixConfiguration {
  prefix: string;
  ignoreCase: boolean;
}
export interface MustPrefixOptionInterface {
  /**
   * List of prefixes
   */
  prefixes: PrefixConfiguration[];
  /**
   * Base folder for naming suggestions, default "src"
   */
  rootFolder: string;
}
