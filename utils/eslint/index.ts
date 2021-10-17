import { enforceFirstConsoleArgumentisString } from './rules/console-first-argument/rule';
import { exportNameRule } from './rules/export-name/rule';
import { forbidImportRule } from './rules/forbid-import/rule';
import { mustPrefixRule } from './rules/must-prefix/rule';

// TODO-FE[TPNX-2275]: Move Rules to package registry

export const rules = {
  'console-first-argument-string': enforceFirstConsoleArgumentisString,
  'export-name-validation': exportNameRule,
  'forbid-import': forbidImportRule,
  'must-prefix': mustPrefixRule,
};
