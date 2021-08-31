interface Extension {
  extension: string;
}

interface ExtensionAndPrefix extends Extension {
  prefix: string;
}

interface ExtensionAndFolder extends Extension {
  folderName: string;
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
  /**
   * Ignore a certain folder in the naming when extension is present
   */
  ignoreFolderInNameOnExtension?: ExtensionAndFolder[];
}
