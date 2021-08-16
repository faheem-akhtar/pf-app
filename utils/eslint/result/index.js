"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rules = void 0;
var rule_1 = require("./rules/export-name/rule");
var rule_2 = require("./rules/forbid-import/rule");
var rule_3 = require("./rules/must-prefix/rule");
// TODO-FE[TPNX-2275]: Move Rules to package registry
exports.rules = {
    'export-name-validation': rule_1.exportNameRule,
    'forbid-import': rule_2.forbidImportRule,
    'must-prefix': rule_3.mustPrefixRule,
};
