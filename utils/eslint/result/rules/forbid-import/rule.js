"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forbidImportRule = void 0;
function forbidImportRule(context) {
    var _a = (context.options[0] || {}), _b = _a.modules, modules = _b === void 0 ? [] : _b, _c = _a.specifiers, specifiers = _c === void 0 ? [] : _c;
    return {
        ImportDeclaration: function (node) {
            if (modules.length) {
                var modulesRegex = new RegExp(modules.join('|'));
                if (modulesRegex.test(node.source.raw)) {
                    context.report({
                        node: node,
                        message: " imports from " + node.source.raw + " have been forbidden, please use a different one",
                    });
                }
            }
            if (specifiers.length) {
                var specifiersObject_1 = specifiers.reduce(function (result, current) {
                    result[current] = true;
                    return result;
                }, {});
                var message = node.specifiers.reduce(function (result, current) {
                    if (specifiersObject_1[current.local.name]) {
                        result += "'" + current.local.name + "', ";
                    }
                    return result;
                }, '');
                if (!!message) {
                    context.report({
                        node: node,
                        message: " the following imports [" + message.replace(/(,\s)$/, '') + "] have been forbidden, please use different ones",
                    });
                }
            }
        },
    };
}
exports.forbidImportRule = forbidImportRule;
