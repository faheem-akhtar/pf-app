"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportNameRule = void 0;
function filterFolderFromSuggestions(list, folderName) {
    return list.map(function (current) { return current.replace(new RegExp(folderName, 'i'), ''); });
}
function getPossibleNames(context) {
    var fileName = context.getFilename();
    var extension = "." + fileName.split('.').pop();
    // Get filename and remove extension, then split
    var pathArray = fileName.replace(extension, '').split('/');
    // Get Options
    var _a = (context.options[0] || {}), _b = _a.enforcePrefixOnExtension, enforcePrefixOnExtension = _b === void 0 ? [] : _b, _c = _a.ignoreCustomExtensionInNameOn, ignoreCustomExtensionInNameOn = _c === void 0 ? [] : _c, _d = _a.ignoreFolderInNameOnExtension, ignoreFolderInNameOnExtension = _d === void 0 ? [] : _d, _e = _a.rootFolder, rootFolder = _e === void 0 ? 'src' : _e;
    // Name of the file without path and extension and custom extensions
    var nameWithoutIgnoredExtensions = ignoreCustomExtensionInNameOn.reduce(function (result, current) {
        var ignoreRegex = new RegExp(current.replace('.', '\\.'));
        return result.replace(ignoreRegex, '');
    }, pathArray[pathArray.length - 1]);
    pathArray[pathArray.length - 1] = nameWithoutIgnoredExtensions;
    var possibleNameGroups = [];
    var counter = 2;
    // Get all possible groups until the rootFolder
    while (!possibleNameGroups.length || !possibleNameGroups[possibleNameGroups.length - 1].includes(rootFolder)) {
        possibleNameGroups.push(pathArray.slice(pathArray.length - counter).join('/'));
        counter++;
    }
    var pascalCaseSuggestions = possibleNameGroups.map(function (current) {
        return current
            // Split by - / .
            .split(/[/.-]/g)
            // Transforms first letters to uppercase
            .map(function (section) { return "" + section[0].toUpperCase() + section.substr(1); })
            .join('');
    });
    ignoreFolderInNameOnExtension.forEach(function (_a) {
        var extension = _a.extension, folderName = _a.folderName;
        if (new RegExp(extension).test(nameWithoutIgnoredExtensions)) {
            pascalCaseSuggestions = filterFolderFromSuggestions(pascalCaseSuggestions, folderName);
        }
    });
    return {
        filename: nameWithoutIgnoredExtensions,
        camelCaseSuggestions: pascalCaseSuggestions.map(function (current) { return "" + current[0].toLowerCase() + current.substr(1); }),
        pascalCaseSuggestions: pascalCaseSuggestions,
        customExtensionsSuggestions: enforcePrefixOnExtension.reduce(function (result, current) {
            var extensionRegex = new RegExp(current.extension, 'i');
            result[current.extension] = pascalCaseSuggestions.map(function (suggestion) { return "" + current.prefix + suggestion.replace(extensionRegex, ''); });
            return result;
        }, {}),
    };
}
function isWordInPascalCase(word) {
    var firstLetter = word[0].toUpperCase();
    return firstLetter === word[0];
}
function checkCase(name, _a) {
    var _b = _a === void 0 ? { rootFolder: 'src' } : _a, enforcePascalCaseOn = _b.enforcePascalCaseOn;
    if (enforcePascalCaseOn) {
        var regex = new RegExp(enforcePascalCaseOn, 'i');
        return regex.test(name);
    }
    return true;
}
function checkName(name, isPascalCase, camelCaseSuggestions, pascalCaseSuggestions) {
    if (isPascalCase) {
        if (isWordInPascalCase(name)) {
            return pascalCaseSuggestions.includes(name);
        }
        else {
            return false;
        }
    }
    else {
        return camelCaseSuggestions.includes(name);
    }
}
function getErrorMessageByCase(isPascalCase, list) {
    return ": " + (isPascalCase ? 'pascal' : 'camel') + " case logic does not match with file path, try one of these instead:\n" + list.reduce(function (result, current) { return result + "- " + current + "\n"; }, '');
}
function getErrorMessages(camelCaseSuggestions, pascalCaseSuggestions, customExtensionsSuggestions) {
    return __assign({ camelCaseMessage: getErrorMessageByCase(false, camelCaseSuggestions), pascalCaseMessage: getErrorMessageByCase(true, pascalCaseSuggestions) }, Object.keys(customExtensionsSuggestions).reduce(function (result, current) {
        result[current] = getErrorMessageByCase(isWordInPascalCase(current), customExtensionsSuggestions[current]);
        return result;
    }, {}));
}
function checkNode(name, node, context, filename, camelCaseSuggestions, camelCaseMessage, pascalCaseSuggestions, pascalCaseMessage, customExtensionsSuggestions, customExtensionsMessages) {
    if (Object.keys(customExtensionsSuggestions).length) {
        var match = Object.keys(customExtensionsSuggestions).find(function (current) {
            var extensionRegex = new RegExp(current, 'i');
            return extensionRegex.test(filename);
        });
        if (match) {
            var valid_1 = checkName(name, isWordInPascalCase(match), customExtensionsSuggestions[match], customExtensionsSuggestions[match]);
            if (!valid_1) {
                context.report({
                    node: node,
                    message: name + " " + customExtensionsMessages[match],
                });
            }
            return;
        }
    }
    var isPascalCase = checkCase(name, context.options[0]);
    var valid = checkName(name, isPascalCase, camelCaseSuggestions, pascalCaseSuggestions);
    if (!valid) {
        context.report({
            node: node,
            message: name + " " + (isPascalCase ? pascalCaseMessage : camelCaseMessage),
        });
    }
}
function exportNameRule(context) {
    var _a = getPossibleNames(context), camelCaseSuggestions = _a.camelCaseSuggestions, pascalCaseSuggestions = _a.pascalCaseSuggestions, customExtensionsSuggestions = _a.customExtensionsSuggestions, filename = _a.filename;
    var _b = getErrorMessages(camelCaseSuggestions, pascalCaseSuggestions, customExtensionsSuggestions), camelCaseMessage = _b.camelCaseMessage, pascalCaseMessage = _b.pascalCaseMessage, customExtensionsMessages = __rest(_b, ["camelCaseMessage", "pascalCaseMessage"]);
    return {
        ExportNamedDeclaration: function (node) {
            if (node.declaration.type === 'VariableDeclaration') {
                node.declaration.declarations.forEach(function (_a) {
                    var id = _a.id;
                    var name = id.name;
                    checkNode(name, node, context, filename, camelCaseSuggestions, camelCaseMessage, pascalCaseSuggestions, pascalCaseMessage, customExtensionsSuggestions, customExtensionsMessages);
                });
            }
            else {
                var name = node.declaration.id.name;
                checkNode(name, node, context, filename, camelCaseSuggestions, camelCaseMessage, pascalCaseSuggestions, pascalCaseMessage, customExtensionsSuggestions, customExtensionsMessages);
            }
        },
    };
}
exports.exportNameRule = exportNameRule;
