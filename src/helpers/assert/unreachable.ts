import { configIsTrace } from 'config/is-trace';

export function assertUnreachable(x: never): void {
  if (configIsTrace) {
    if (x === '__full') {
      // do not spam in trace mode
      return;
    }
  }
  // eslint-disable-next-line no-console
  console.error(x, 'AssertUnreachable called with');
}
