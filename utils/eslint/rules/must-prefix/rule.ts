import { Rule } from 'eslint';

import { MustPrefixOptionInterface } from './option.interface';

function createMessage(customString: string): string {
  return `: Exported module doesn't have required prefix, try adding ${customString} as prefix.`;
}

function getMessage(firstMatchingFolder: string, ignoreCase: boolean): string {
  if (ignoreCase) {
    const firstLetterUppercase = firstMatchingFolder[0].toUpperCase();
    const isPrefixPascalCase = firstLetterUppercase === firstMatchingFolder[0];
    return createMessage(
      `"${firstMatchingFolder}" or "${
        isPrefixPascalCase
          ? `${firstMatchingFolder[0].toLowerCase()}${firstMatchingFolder.substr(1)}`
          : `${firstMatchingFolder[0].toUpperCase()}${firstMatchingFolder.substr(1)}`
      }"`
    );
  } else {
    return createMessage(`"${firstMatchingFolder}"`);
  }
}

function checkNode(name: string, node: Rule.Node, context: Rule.RuleContext, message: string, regex: RegExp): void {
  if (!regex.test(name)) {
    context.report({ node, message: `${name} ${message}` });
  }
}

export function mustPrefixRule(context: Rule.RuleContext): Rule.RuleListener {
  const { prefixes = [], rootFolder = 'src' } = (context.options[0] || {}) as MustPrefixOptionInterface;

  const fileName: string = context.getFilename();
  const extension: string = `.${fileName.split('.').pop()}`;
  // Get filename and remove extension, then split
  const pathArray: string[] = fileName.replace(extension, '').split('/');
  const validPathArray: string[] = pathArray.slice(pathArray.indexOf(rootFolder));

  const prefixObject = prefixes.reduce((result, current) => {
    result[current.prefix] = current;
    return result;
  }, {});

  const firstMatchingFolder = validPathArray.find((current) => prefixObject[current]);

  if (!firstMatchingFolder) {
    return {};
  }

  const { ignoreCase } = prefixObject[firstMatchingFolder];
  const message: string = getMessage(firstMatchingFolder, ignoreCase);

  const prefixRegex = new RegExp(`^${firstMatchingFolder}`, `${ignoreCase ? 'i' : ''}`);

  return {
    ExportNamedDeclaration: (node) => {
      if (node.declaration.type === 'VariableDeclaration') {
        node.declaration.declarations.forEach(({ id }) => {
          checkNode((id as any).name, node, context, message, prefixRegex);
        });
      } else {
        checkNode(node.declaration.id.name, node, context, message, prefixRegex);
      }
    },
  };
}
