export interface EnforceExtensionOptionInterface {
  /**
   * Base folder for naming suggestions, default "src"
   */
  rootFolder: string;
  /**
   * Object with folder name and relative extension
   */
  foldersAndExtensions: {
    [folderName: string]: string;
  };
  /**
   * Whether to ignore or not barrel files
   */
  ignoreBarrelFiles: boolean;
}
