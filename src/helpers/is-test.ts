/**
 * Determine test environment
 * @returns true if running jest tests
 */
export function helpersIsTest(): boolean {
  return process.env.JEST_WORKER_ID !== undefined;
}
