"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportNameRule = void 0;
function getPossibleNames(context) {
    var fileName = context.getFilename();
    var extension = "." + fileName.split('.').pop();
    // Get filename and remove extension, then split
    var pathArray = fileName.replace(extension, '').split('/');
    // Get Options
    var _a = (context.options[0] || {}), ignorePascalCase = _a.ignorePascalCase, _b = _a.rootFolder, rootFolder = _b === void 0 ? 'src' : _b;
    var possibleNameGroups = [];
    var counter = 2;
    // Get all possible groups until the rootFolder
    while (!possibleNameGroups.length || !possibleNameGroups[possibleNameGroups.length - 1].includes(rootFolder)) {
        possibleNameGroups.push(pathArray.slice(pathArray.length - counter).join('/'));
        counter++;
    }
    var pascalCaseNames = possibleNameGroups.map(function (current) {
        return current
            // Split by - / .
            .split(/[/.-]/g)
            // Transforms first letters to uppercase
            .map(function (section) { return "" + section[0].toUpperCase() + section.substr(1); })
            // Joins string
            .join('');
    });
    if (ignorePascalCase) {
        var regex_1 = new RegExp(ignorePascalCase.regex, 'i');
        return pascalCaseNames.map(function (current) {
            return regex_1.test(current) === ignorePascalCase.match ? "" + current[0].toLowerCase() + current.substr(1) : current;
        });
    }
    else {
        return pascalCaseNames;
    }
}
function exportNameRule(context) {
    var possibleNames = getPossibleNames(context);
    var message = "camel case logic does not match with file path, try one of these instead:\n" + possibleNames.reduce(function (result, current) { return result + "- " + current + "\n"; }, '');
    return {
        ExportNamedDeclaration: function (node) {
            if (node.declaration.type === 'VariableDeclaration') {
                node.declaration.declarations.forEach(function (_a) {
                    var id = _a.id;
                    if (!possibleNames.includes(id.name)) {
                        context.report({ node: node, message: id.name + " " + message });
                    }
                });
            }
            else if (!possibleNames.includes(node.declaration.id.name)) {
                context.report({ node: node, message: node.declaration.id.name + " " + message });
            }
        },
    };
}
exports.exportNameRule = exportNameRule;
