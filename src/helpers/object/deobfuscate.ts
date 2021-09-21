import { configStatsDataEncryptionKey } from 'config/stats-data-encryption-key';
import { notSecureDecipher } from 'helpers/not-secure/decipher';
import { objectDeepMapKeys } from 'helpers/object/deep-map-keys';
import { AnyValueType } from 'types/any/value.type';

import { objectObfuscateKeySeparationSymbol } from './obfuscate-key-separation-symbol';

const decrypt = notSecureDecipher(configStatsDataEncryptionKey.get());

export const objectDeobfuscate = (rawData: Record<string, AnyValueType>): Record<string, AnyValueType> =>
  objectDeepMapKeys(rawData, (key: string) => {
    const decrypted = decrypt(key);
    const keyTemp = decrypted.substr(decrypted.indexOf(objectObfuscateKeySeparationSymbol) + 1);
    return keyTemp.substr(0, keyTemp.indexOf(objectObfuscateKeySeparationSymbol));
  });
