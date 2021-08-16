import { Rule } from 'eslint';

import { ForbidImportOptionInterface } from './option.interface';

export function forbidImportRule(context: Rule.RuleContext): Rule.RuleListener {
  const { modules = [], specifiers = [] } = (context.options[0] || {}) as ForbidImportOptionInterface;

  return {
    ImportDeclaration: (node) => {
      if (modules.length) {
        const modulesRegex = new RegExp(modules.join('|'));
        if (modulesRegex.test(node.source.raw)) {
          context.report({
            node,
            message: ` imports from ${node.source.raw} have been forbidden, please use a different one`,
          });
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
