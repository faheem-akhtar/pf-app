import { exportNameRule } from './rules/export-name/rule';
import { filenameRule } from './rules/filename/rule';
import { mustPrefixRule } from './rules/must-prefix/rule';

// TODO-FE[TPNX-2275]: Move Rules to package registry

export const rules = {
  'export-name-validation': exportNameRule,
  'filename-validation': filenameRule,
  'must-prefix': mustPrefixRule,
};
