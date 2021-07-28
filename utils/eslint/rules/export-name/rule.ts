import { Rule } from 'eslint';

import { ExportNameOptionInterface } from './option.interface';

function getPossibleNames(context: Rule.RuleContext): {
  filename: string;
  camelCaseSuggestions: string[];
  pascalCaseSuggestions: string[];
  customExtensionsSuggestions: { [key: string]: string[] };
} {
  const fileName: string = context.getFilename();
  const extension: string = `.${fileName.split('.').pop()}`;
  // Get filename and remove extension, then split
  const pathArray: string[] = fileName.replace(extension, '').split('/');
  // Get Options
  const {
    enforcePrefixOnExtension = [],
    ignoreCustomExtensionInNameOn = [],
    rootFolder = 'src',
  } = (context.options[0] || {}) as ExportNameOptionInterface;

  // Name of the file without path and extension and custom extensions
  const nameWithoutIgnoredExtensions = ignoreCustomExtensionInNameOn.reduce((result, current) => {
    const ignoreRegex = new RegExp(current);
    return result.replace(ignoreRegex, '');
  }, pathArray[pathArray.length - 1]);

  pathArray[pathArray.length - 1] = nameWithoutIgnoredExtensions;

  const possibleNameGroups: string[] = [];
  let counter: number = 2;
  // Get all possible groups until the rootFolder
  while (!possibleNameGroups.length || !possibleNameGroups[possibleNameGroups.length - 1].includes(rootFolder)) {
    possibleNameGroups.push(pathArray.slice(pathArray.length - counter).join('/'));
    counter++;
  }

  const pascalCaseSuggestions = possibleNameGroups.map((current) =>
    current
      // Split by - / .
      .split(/[/.-]/g)
      // Transforms first letters to uppercase
      .map((section) => `${section[0].toUpperCase()}${section.substr(1)}`)
      .join('')
  );

  return {
    filename: nameWithoutIgnoredExtensions,
    camelCaseSuggestions: pascalCaseSuggestions.map((current) => `${current[0].toLowerCase()}${current.substr(1)}`),
    pascalCaseSuggestions,
    customExtensionsSuggestions: enforcePrefixOnExtension.reduce((result, current) => {
      const extensionRegex = new RegExp(current.extension, 'i');
      result[current.extension] = pascalCaseSuggestions.map(
        (suggestion) => `${current.prefix}${suggestion.replace(extensionRegex, '')}`
      );
      return result;
    }, {}),
  };
}

function isWordInPascalCase(word: string): boolean {
  const firstLetter = word[0].toUpperCase();
  return firstLetter === word[0];
}

function checkCase(name: string, { enforcePascalCaseOn }: ExportNameOptionInterface = { rootFolder: 'src' }): boolean {
  if (enforcePascalCaseOn) {
    const regex = new RegExp(enforcePascalCaseOn, 'i');
    return regex.test(name);
  }
  return true;
}

function checkName(
  name: string,
  isPascalCase: boolean,
  camelCaseSuggestions: string[],
  pascalCaseSuggestions: string[]
): boolean {
  if (isPascalCase) {
    if (isWordInPascalCase(name)) {
      return pascalCaseSuggestions.includes(name);
    } else {
      return false;
    }
  } else {
    return camelCaseSuggestions.includes(name);
  }
}

function getErrorMessageByCase(isPascalCase: boolean, list: string[]): string {
  return `: ${
    isPascalCase ? 'pascal' : 'camel'
  } case logic does not match with file path, try one of these instead:\n${list.reduce(
    (result, current) => `${result}- ${current}\n`,
    ''
  )}`;
}

function getErrorMessages(
  camelCaseSuggestions: string[],
  pascalCaseSuggestions: string[],
  customExtensionsSuggestions: { [key: string]: string[] }
): { camelCaseMessage: string; pascalCaseMessage: string; [key: string]: string } {
  return {
    camelCaseMessage: getErrorMessageByCase(false, camelCaseSuggestions),
    pascalCaseMessage: getErrorMessageByCase(true, pascalCaseSuggestions),
    ...Object.keys(customExtensionsSuggestions).reduce((result, current) => {
      result[current] = getErrorMessageByCase(isWordInPascalCase(current), customExtensionsSuggestions[current]);
      return result;
    }, {}),
  };
}

function checkNode(
  name: string,
  node: Rule.Node,
  context: Rule.RuleContext,
  filename: string,
  camelCaseSuggestions: string[],
  camelCaseMessage: string,
  pascalCaseSuggestions: string[],
  pascalCaseMessage: string,
  customExtensionsSuggestions: { [key: string]: string[] },
  customExtensionsMessages: { [key: string]: string }
) {
  if (Object.keys(customExtensionsSuggestions).length) {
    const match = Object.keys(customExtensionsSuggestions).find((current) => {
      const extensionRegex = new RegExp(current, 'i');
      return extensionRegex.test(filename);
    });

    if (match) {
      const valid = checkName(
        name,
        isWordInPascalCase(match),
        customExtensionsSuggestions[match],
        customExtensionsSuggestions[match]
      );
      if (!valid) {
        context.report({
          node,
          message: `${name} ${customExtensionsMessages[match]}`,
        });
      }
      return;
    }
  }

  const isPascalCase = checkCase(name, context.options[0]);
  const valid = checkName(name, isPascalCase, camelCaseSuggestions, pascalCaseSuggestions);
  if (!valid) {
    context.report({
      node,
      message: `${name} ${isPascalCase ? pascalCaseMessage : camelCaseMessage}`,
    });
  }
}

export function exportNameRule(context: Rule.RuleContext): Rule.RuleListener {
  const { camelCaseSuggestions, pascalCaseSuggestions, customExtensionsSuggestions, filename } =
    getPossibleNames(context);

  const { camelCaseMessage, pascalCaseMessage, ...customExtensionsMessages } = getErrorMessages(
    camelCaseSuggestions,
    pascalCaseSuggestions,
    customExtensionsSuggestions
  );

  return {
    ExportNamedDeclaration: (node) => {
      if (node.declaration.type === 'VariableDeclaration') {
        node.declaration.declarations.forEach(({ id }) => {
          const name = (id as any).name;
          checkNode(
            name,
            node,
            context,
            filename,
            camelCaseSuggestions,
            camelCaseMessage,
            pascalCaseSuggestions,
            pascalCaseMessage,
            customExtensionsSuggestions,
            customExtensionsMessages
          );
        });
      } else {
        const name = node.declaration.id.name;
        checkNode(
          name,
          node,
          context,
          filename,
          camelCaseSuggestions,
          camelCaseMessage,
          pascalCaseSuggestions,
          pascalCaseMessage,
          customExtensionsSuggestions,
          customExtensionsMessages
        );
      }
    },
  };
}
