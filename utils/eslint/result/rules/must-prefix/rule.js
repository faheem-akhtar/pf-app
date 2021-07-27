"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mustPrefixRule = void 0;
function createMessage(customString) {
    return ": Exported module doesn't have required prefix, try adding " + customString + " as prefix.";
}
function getMessage(firstMatchingFolder, ignoreCase) {
    if (ignoreCase) {
        var firstLetterUppercase = firstMatchingFolder[0].toUpperCase();
        var isPrefixPascalCase = firstLetterUppercase === firstMatchingFolder[0];
        return createMessage("\"" + firstMatchingFolder + "\" or \"" + (isPrefixPascalCase
            ? "" + firstMatchingFolder[0].toLowerCase() + firstMatchingFolder.substr(1)
            : "" + firstMatchingFolder[0].toUpperCase() + firstMatchingFolder.substr(1)) + "\"");
    }
    else {
        return createMessage("\"" + firstMatchingFolder + "\"");
    }
}
function checkNode(name, node, context, message, regex) {
    if (!regex.test(name)) {
        context.report({ node: node, message: name + " " + message });
    }
}
function mustPrefixRule(context) {
    var _a = (context.options[0] || {}), _b = _a.prefixes, prefixes = _b === void 0 ? [] : _b, _c = _a.rootFolder, rootFolder = _c === void 0 ? 'src' : _c;
    var fileName = context.getFilename();
    var extension = "." + fileName.split('.').pop();
    // Get filename and remove extension, then split
    var pathArray = fileName.replace(extension, '').split('/');
    var validPathArray = pathArray.slice(pathArray.indexOf(rootFolder));
    var prefixObject = prefixes.reduce(function (result, current) {
        result[current.prefix] = current;
        return result;
    }, {});
    var firstMatchingFolder = validPathArray.find(function (current) { return prefixObject[current]; });
    if (!firstMatchingFolder) {
        return {};
    }
    var ignoreCase = prefixObject[firstMatchingFolder].ignoreCase;
    var message = getMessage(firstMatchingFolder, ignoreCase);
    var prefixRegex = new RegExp("^" + firstMatchingFolder, "" + (ignoreCase ? 'i' : ''));
    return {
        ExportNamedDeclaration: function (node) {
            if (node.declaration.type === 'VariableDeclaration') {
                node.declaration.declarations.forEach(function (_a) {
                    var id = _a.id;
                    checkNode(id.name, node, context, message, prefixRegex);
                });
            }
            else {
                checkNode(node.declaration.id.name, node, context, message, prefixRegex);
            }
        },
    };
}
exports.mustPrefixRule = mustPrefixRule;
