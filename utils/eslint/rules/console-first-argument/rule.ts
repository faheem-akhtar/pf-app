import { Rule } from 'eslint';
import { Identifier, MemberExpression } from 'estree';

export function enforceFirstConsoleArgumentisString(context: Rule.RuleContext): Rule.RuleListener {
  const message: string = 'Console methods first argument must be a string';

  return {
    CallExpression: (node) => {
      if (((node?.callee as MemberExpression)?.object as Identifier)?.name === 'console') {
        if (node.arguments.length) {
          const firstArgument = node.arguments[0];

          switch (firstArgument.type) {
            case 'Literal':
              break;
            case 'TemplateLiteral':
              break;
            case 'Identifier':
              if (context.getScope().variables[0].references[0]?.writeExpr.type !== 'TemplateLiteral') {
                context.report({ node, message });
              }
              break;
            default:
              context.report({ node, message });
              break;
          }
        }
      }
    },
  };
}
