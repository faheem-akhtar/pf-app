"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rules = void 0;
var rule_1 = require("./rules/console-first-argument/rule");
var rule_2 = require("./rules/enforce-extension/rule");
var rule_3 = require("./rules/export-name/rule");
var rule_4 = require("./rules/forbid-import/rule");
var rule_5 = require("./rules/must-prefix/rule");
// TODO-FE[TPNX-2275]: Move Rules to package registry
// eslint-disable-next-line pf-rules/export-name-validation
exports.rules = {
    'console-first-argument-string': rule_1.enforceFirstConsoleArgumentisString,
    'enforce-extension-in-folder': rule_2.enforceExtensionRule,
    'export-name-validation': rule_3.exportNameRule,
    'forbid-import': rule_4.forbidImportRule,
    'must-prefix': rule_5.mustPrefixRule,
};
