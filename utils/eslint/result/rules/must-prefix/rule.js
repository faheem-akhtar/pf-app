"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mustPrefixRule = void 0;
function mustPrefixRule(context) {
    var _a = (context.options[0] || {}), _b = _a.prefixes, prefixes = _b === void 0 ? [] : _b, _c = _a.rootFolder, rootFolder = _c === void 0 ? 'src' : _c;
    var fileName = context.getFilename();
    var extension = "." + fileName.split('.').pop();
    // Get filename and remove extension, then split
    var pathArray = fileName.replace(extension, '').split('/');
    var validPathArray = pathArray.slice(pathArray.indexOf(rootFolder));
    var prefixObject = prefixes.reduce(function (result, current) {
        result[current] = true;
        return result;
    }, {});
    var firstMatchingFolder = validPathArray.find(function (current) { return prefixObject[current]; }) || '';
    var message = ": Exported module doesn't have required prefix, try adding \"" + firstMatchingFolder + "\" as prefix.";
    var prefixRegex = new RegExp("^" + firstMatchingFolder);
    return {
        ExportNamedDeclaration: function (node) {
            if (node.declaration.type === 'VariableDeclaration') {
                node.declaration.declarations.forEach(function (_a) {
                    var id = _a.id;
                    if (!prefixRegex.test(id.name)) {
                        context.report({ node: node, message: id.name + " " + message });
                    }
                });
            }
            else if (!prefixRegex.test(node.declaration.id.name)) {
                context.report({ node: node, message: node.declaration.id.name + " " + message });
            }
        },
    };
}
exports.mustPrefixRule = mustPrefixRule;
