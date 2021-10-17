"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enforceFirstConsoleArgumentisString = void 0;
function enforceFirstConsoleArgumentisString(context) {
    var message = 'Console methods first argument must be a string';
    return {
        CallExpression: function (node) {
            var _a, _b, _c;
            if (((_b = (_a = node === null || node === void 0 ? void 0 : node.callee) === null || _a === void 0 ? void 0 : _a.object) === null || _b === void 0 ? void 0 : _b.name) === 'console') {
                if (node.arguments.length) {
                    var firstArgument = node.arguments[0];
                    switch (firstArgument.type) {
                        case 'Literal':
                            break;
                        case 'TemplateLiteral':
                            break;
                        case 'Identifier':
                            if (((_c = context.getScope().variables[0].references[0]) === null || _c === void 0 ? void 0 : _c.writeExpr.type) !== 'TemplateLiteral') {
                                context.report({ node: node, message: message });
                            }
                            break;
                        default:
                            context.report({ node: node, message: message });
                            break;
                    }
                }
            }
        },
    };
}
exports.enforceFirstConsoleArgumentisString = enforceFirstConsoleArgumentisString;
