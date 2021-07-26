export interface ExportNameOptionInterface {
  /**
   * Whether or not to ignore the pascal case in filenames matching regex
   */
  ignorePascalCase?: {
    match: boolean;
    regex: string;
  };
  /**
   * Base folder for naming suggestions, default "src"
   */
  rootFolder: string;
}
