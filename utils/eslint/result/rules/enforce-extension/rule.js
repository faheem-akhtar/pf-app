"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enforceExtensionRule = void 0;
function enforceExtensionRule(context) {
    return {
        Program: function (node) {
            var filepath = context.getFilename().split('/');
            var fileName = filepath.pop();
            // Get Options
            var _a = (context.options[0] || {}), _b = _a.foldersAndExtensions, foldersAndExtensions = _b === void 0 ? {} : _b, _c = _a.ignoreBarrelFiles, ignoreBarrelFiles = _c === void 0 ? false : _c, _d = _a.rootFolder, rootFolder = _d === void 0 ? 'src' : _d;
            if (ignoreBarrelFiles && /^(index)\..+$/.test(fileName)) {
                return;
            }
            var indexOfRootFolder = filepath.indexOf(rootFolder);
            if (indexOfRootFolder > -1) {
                var slicedPath_1 = filepath.slice(indexOfRootFolder);
                Object.keys(foldersAndExtensions).forEach(function (folder) {
                    var extensionRegex = new RegExp("(" + foldersAndExtensions[folder] + ")\\..+$", 'i');
                    if (slicedPath_1.indexOf(folder) > -1 && !extensionRegex.test(fileName)) {
                        context.report({
                            node: node,
                            message: "Files in \"" + folder + "\" folder should have the \"" + foldersAndExtensions[folder] + "\" extension",
                        });
                    }
                });
            }
        },
    };
}
exports.enforceExtensionRule = enforceExtensionRule;
