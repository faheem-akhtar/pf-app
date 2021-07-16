/**
 * Return a number formatted to a rounded value separated by commas or another spacer
 */
export function numberFormat(value: number, separator: string = ','): string {
  // TODO-FE[TPNX-2158] - refactor numberFormat
  return Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}
