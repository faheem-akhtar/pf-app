import { configOriginValue } from './value';
import { helpersIsDevelopment } from 'helpers/is-development';

export const configOriginIfDevUseStagingValue = (): string => {
  return configOriginValue.replace('https://www.', `https://${helpersIsDevelopment ? 'staging.' : ''}`);
};
