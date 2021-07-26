import { Rule } from 'eslint';

import { ExportNameOptionInterface } from './option.interface';

function getPossibleNames(context: Rule.RuleContext): string[] {
  const fileName: string = context.getFilename();
  const extension: string = `.${fileName.split('.').pop()}`;
  // Get filename and remove extension, then split
  const pathArray: string[] = fileName.replace(extension, '').split('/');
  // Get Options
  const { ignorePascalCase, rootFolder = 'src' } = (context.options[0] || {}) as ExportNameOptionInterface;

  const possibleNameGroups: string[] = [];
  let counter: number = 2;
  // Get all possible groups until the rootFolder
  while (!possibleNameGroups.length || !possibleNameGroups[possibleNameGroups.length - 1].includes(rootFolder)) {
    possibleNameGroups.push(pathArray.slice(pathArray.length - counter).join('/'));
    counter++;
  }

  const pascalCaseNames = possibleNameGroups.map((current) =>
    current
      // Split by - / .
      .split(/[/.-]/g)
      // Transforms first letters to uppercase
      .map((section) => `${section[0].toUpperCase()}${section.substr(1)}`)
      // Joins string
      .join('')
  );

  if (ignorePascalCase) {
    const regex = new RegExp(ignorePascalCase.regex, 'i');

    return pascalCaseNames.map((current) =>
      regex.test(current) === ignorePascalCase.match ? `${current[0].toLowerCase()}${current.substr(1)}` : current
    );
  } else {
    return pascalCaseNames;
  }
}

export function exportNameRule(context: Rule.RuleContext): Rule.RuleListener {
  const possibleNames: string[] = getPossibleNames(context);
  const message: string = `camel case logic does not match with file path, try one of these instead:\n${possibleNames.reduce(
    (result, current) => `${result}- ${current}\n`,
    ''
  )}`;

  return {
    ExportNamedDeclaration: (node) => {
      if (node.declaration.type === 'VariableDeclaration') {
        node.declaration.declarations.forEach(({ id }) => {
          if (!possibleNames.includes((id as any).name)) {
            context.report({ node, message: `${(id as any).name} ${message}` });
          }
        });
      } else if (!possibleNames.includes(node.declaration.id.name)) {
        context.report({ node, message: `${node.declaration.id.name} ${message}` });
      }
    },
  };
}
