/**
 * Creates an integer array containing numbers from start to stop.
 *
 * @see https://docs.python.org/3/library/stdtypes.html#typesseq-range
 */
export const arrayFromRange = (start: number, stop: number | null = null, step?: number): number[] => {
  if (stop === null) {
    stop = start || 0;
    start = 0;
  }

  if (!step) {
    step = stop < start ? -1 : 1;
  }

  const length = Math.max(Math.ceil((stop - start) / step), 0);

  const range = Array(length);

  for (let idx = 0; idx < length; idx++, start += step) {
    range[idx] = start;
  }

  return range;
};
