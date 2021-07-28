interface ExtensionAndPrefix {
  extension: string;
  prefix: string;
}

export interface ExportNameOptionInterface {
  /**
   * Base folder for naming suggestions, default "src"
   */
  rootFolder: string;
  /**
   * Regex to enforce pascal case in certain types of modules
   */
  enforcePascalCaseOn?: string;
  /**
   * Enforces the use of a specific prefix on specific extensions
   */
  enforcePrefixOnExtension?: ExtensionAndPrefix[];
  /**
   * List of extensions to ignore in the module name
   */
  ignoreCustomExtensionInNameOn?: string[];
}
