import { backendApiPfWebsiteInternalOrigin } from 'backend/api/pf-website-internal-origin';
import { configOriginValue } from './value';
import { helpersIsDevelopment } from 'helpers/is-development';

export const configOriginIfDevUseStagingValue = (): string => {
  if (helpersIsDevelopment) {
    return configOriginValue.replace('www.', 'staging.');
  }
  return backendApiPfWebsiteInternalOrigin;
};
