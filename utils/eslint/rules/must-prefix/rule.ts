import { Rule } from 'eslint';

import { MustPrefixOptionInterface } from './option.interface';

export function mustPrefixRule(context: Rule.RuleContext): Rule.RuleListener {
  const { prefixes = [], rootFolder = 'src' } = (context.options[0] || {}) as MustPrefixOptionInterface;

  const fileName: string = context.getFilename();
  const extension: string = `.${fileName.split('.').pop()}`;
  // Get filename and remove extension, then split
  const pathArray: string[] = fileName.replace(extension, '').split('/');
  const validPathArray: string[] = pathArray.slice(pathArray.indexOf(rootFolder));

  const prefixObject = prefixes.reduce((result, current) => {
    result[current] = true;
    return result;
  }, {});

  const firstMatchingFolder = validPathArray.find((current) => prefixObject[current]) || '';

  const message: string = `: Exported module doesn't have required prefix, try adding "${firstMatchingFolder}" as prefix.`;

  const prefixRegex = new RegExp(`^${firstMatchingFolder}`);

  return {
    ExportNamedDeclaration: (node) => {
      if (node.declaration.type === 'VariableDeclaration') {
        node.declaration.declarations.forEach(({ id }) => {
          if (!prefixRegex.test((id as any).name)) {
            context.report({ node, message: `${(id as any).name} ${message}` });
          }
        });
      } else if (!prefixRegex.test(node.declaration.id.name)) {
        context.report({ node, message: `${node.declaration.id.name} ${message}` });
      }
    },
  };
}
