import { Rule } from 'eslint';

import { EnforceExtensionOptionInterface } from './option.interface';

export function enforceExtensionRule(context: Rule.RuleContext): Rule.RuleListener {
  return {
    Program: (node) => {
      const filepath = context.getFilename().split('/');
      const fileName = filepath.pop();

      // Get Options
      const {
        foldersAndExtensions = {},
        ignoreBarrelFiles = false,
        rootFolder = 'src',
      } = (context.options[0] || {}) as EnforceExtensionOptionInterface;

      if (ignoreBarrelFiles && /^(index)\..+$/.test(fileName)) {
        return;
      }

      const indexOfRootFolder = filepath.indexOf(rootFolder);

      if (indexOfRootFolder > -1) {
        const slicedPath = filepath.slice(indexOfRootFolder);

        Object.keys(foldersAndExtensions).forEach((folder) => {
          const extensionRegex = new RegExp(`(${foldersAndExtensions[folder]})\\..+$`, 'i');

          if (slicedPath.indexOf(folder) > -1 && !extensionRegex.test(fileName)) {
            context.report({
              node,
              message: `Files in "${folder}" folder should have the "${foldersAndExtensions[folder]}" extension`,
            });
          }
        });
      }
    },
  };
}
