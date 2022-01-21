/**
 * returns environment string for datadog-logs
 */
export const environmentGetDatadog = (countryCode: string): string => process.env.ENVIRONMENT || `dev_${countryCode}`;
