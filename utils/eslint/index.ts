import { enforceFirstConsoleArgumentisString } from './rules/console-first-argument/rule';
import { enforceExtensionRule } from './rules/enforce-extension/rule';
import { exportNameRule } from './rules/export-name/rule';
import { forbidImportRule } from './rules/forbid-import/rule';
import { mustPrefixRule } from './rules/must-prefix/rule';

// TODO-FE[TPNX-2275]: Move Rules to package registry

// eslint-disable-next-line pf-rules/export-name-validation
export const rules = {
  'console-first-argument-string': enforceFirstConsoleArgumentisString,
  'enforce-extension-in-folder': enforceExtensionRule,
  'export-name-validation': exportNameRule,
  'forbid-import': forbidImportRule,
  'must-prefix': mustPrefixRule,
};
