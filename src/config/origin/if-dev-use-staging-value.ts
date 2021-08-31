import { configOriginValue } from './value';
import { helpersIsDevelopment } from 'helpers/is-development';

export const configOriginIfDevUseStagingValue = (): string => {
  return helpersIsDevelopment ? configOriginValue.replace('https://www.', 'staging.') : configOriginValue;
};
