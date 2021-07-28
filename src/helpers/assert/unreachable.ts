export function assertUnreachable(x: never): never {
  throw new Error(`AssertUnreachable called with ${JSON.stringify(x)}`);
}
