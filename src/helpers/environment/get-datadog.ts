/**
 * returns environment string for datadog-logs
 */
export const environmentGetDatadog = (countryCode: string): string =>
  process.env.ENVIRONMENT === 'staging' ? 'staging' : `prod_${countryCode}`;
