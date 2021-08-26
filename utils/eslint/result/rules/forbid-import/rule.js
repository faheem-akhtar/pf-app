"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forbidImportRule = void 0;
function forbidImportRule(context) {
    var _a = (context.options[0] || {}), _b = _a.modules, modules = _b === void 0 ? [] : _b, _c = _a.specifiers, specifiers = _c === void 0 ? [] : _c;
    var fileName = context.getFilename();
    return {
        ImportDeclaration: function (node) {
            if (modules.length) {
                var _a = modules.reduce(function (result, current) {
                    if (typeof current === 'string') {
                        result.simpleModules.push(current);
                    }
                    else {
                        result.modulesWithWhiteList.push(current);
                    }
                    return result;
                }, { simpleModules: [], modulesWithWhiteList: [] }), simpleModules = _a.simpleModules, modulesWithWhiteList = _a.modulesWithWhiteList;
                var modulesRegex = new RegExp(simpleModules.join('|'));
                if (modulesRegex.test(node.source.raw)) {
                    context.report({
                        node: node,
                        message: " imports from " + node.source.raw + " have been forbidden, please use a different one",
                    });
                }
                else {
                    var found = modulesWithWhiteList.find(function (_a) {
                        var moduleName = _a.moduleName, whiteListedFilePaths = _a.whiteListedFilePaths;
                        var moduleRegex = new RegExp(moduleName);
                        if (moduleRegex.test(node.source.raw)) {
                            var whiteLisedPathsRegex = new RegExp(whiteListedFilePaths.join('|'));
                            return !whiteLisedPathsRegex.test(fileName);
                        }
                    });
                    if (found) {
                        context.report({
                            node: node,
                            message: " imports from \"" + found.moduleName + "\" have been forbidden on files that are not part of the white listed paths (" + found.whiteListedFilePaths.join('|') + "), please use a different one",
                        });
                    }
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
