// TODO-FE[TPNX-3016] Move tests
/**
 * Create a space-separated list of HTML class names from given arguments.
 *
 * When argument is an object, all of its properties
 * whose values are evaluating to true are added to the list.
 */
export function domClassMerge(
  ...args: Array<string | number | Record<string, boolean | null | void> | undefined>
): string {
  const classes = [];

  for (const arg of args) {
    const argType = typeof arg;

    if (argType === 'object') {
      const obj = arg as Record<string, boolean>;

      Object.keys(obj).forEach((className) => {
        const value = obj[className];

        if (value) {
          classes.push(className);
        }
      });
    } else if (argType === 'string') {
      classes.push((arg as string).trim());
    } else if (argType === 'number') {
      classes.push(arg);
    }
  }

  return classes.join(' ');
}
