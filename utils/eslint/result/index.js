"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rules = void 0;
var rule_1 = require("./rules/console-first-argument/rule");
var rule_2 = require("./rules/export-name/rule");
var rule_3 = require("./rules/forbid-import/rule");
var rule_4 = require("./rules/must-prefix/rule");
// TODO-FE[TPNX-2275]: Move Rules to package registry
exports.rules = {
    'console-first-argument-string': rule_1.enforceFirstConsoleArgumentisString,
    'export-name-validation': rule_2.exportNameRule,
    'forbid-import': rule_3.forbidImportRule,
    'must-prefix': rule_4.mustPrefixRule,
};
