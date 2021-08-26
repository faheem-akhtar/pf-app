import { Rule } from 'eslint';

import { ForbidImportOptionInterface, OptionWithWhiteList } from './option.interface';

export function forbidImportRule(context: Rule.RuleContext): Rule.RuleListener {
  const { modules = [], specifiers = [] } = (context.options[0] || {}) as ForbidImportOptionInterface;

  const fileName: string = context.getFilename();

  return {
    ImportDeclaration: (node) => {
      if (modules.length) {
        const { simpleModules, modulesWithWhiteList } = modules.reduce<{
          simpleModules: string[];
          modulesWithWhiteList: OptionWithWhiteList[];
        }>(
          (result, current) => {
            if (typeof current === 'string') {
              result.simpleModules.push(current);
            } else {
              result.modulesWithWhiteList.push(current);
            }
            return result;
          },
          { simpleModules: [], modulesWithWhiteList: [] }
        );

        const modulesRegex = new RegExp(simpleModules.join('|'));
        if (modulesRegex.test(node.source.raw)) {
          context.report({
            node,
            message: ` imports from ${node.source.raw} have been forbidden, please use a different one`,
          });
        } else {
          const found = modulesWithWhiteList.find(({ moduleName, whiteListedFilePaths }) => {
            const moduleRegex = new RegExp(moduleName);
            if (moduleRegex.test(node.source.raw)) {
              const whiteLisedPathsRegex = new RegExp(whiteListedFilePaths.join('|'));
              return !whiteLisedPathsRegex.test(fileName);
            }
          });
          if (found) {
            context.report({
              node,
              message: ` imports from "${
                found.moduleName
              }" have been forbidden on files that are not part of the white listed paths (${found.whiteListedFilePaths.join(
                '|'
              )}), please use a different one`,
            });
          }
        }
      }
      if (specifiers.length) {
        const specifiersObject = specifiers.reduce((result, current) => {
          result[current] = true;
          return result;
        }, {});

        const message = node.specifiers.reduce((result, current) => {
          if (specifiersObject[current.local.name]) {
            result += `'${current.local.name}', `;
          }
          return result;
        }, '');
        if (!!message) {
          context.report({
            node,
            message: ` the following imports [${message.replace(
              /(,\s)$/,
              ''
            )}] have been forbidden, please use different ones`,
          });
        }
      }
    },
  };
}
