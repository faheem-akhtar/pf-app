export function assertUnreachable(x: never): void {
  // eslint-disable-next-line no-console
  console.error('AssertUnreachable called with', x);
}
