export interface OptionWithWhiteList {
  /**
   * Name of the module to forbid
   */
  moduleName: string;
  /**
   * List of white listed paths
   */
  whiteListedFilePaths: string[];
}

export interface ForbidImportOptionInterface {
  /**
   * List of modules forbidden to use
   */
  modules?: Array<string | OptionWithWhiteList>;
  /**
   * List of specifiers forbiden to use
   */
  specifiers?: string[];
}
