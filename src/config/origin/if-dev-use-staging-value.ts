import { helpersIsDevelopment } from 'helpers/is-development';

import { configOriginValue } from './value';

export const configOriginIfDevUseStagingValue = (): string => {
  if (helpersIsDevelopment) {
    return `https://${configOriginValue.replace('www.', 'staging.')}`;
  }
  return `https://${configOriginValue}`;
};
