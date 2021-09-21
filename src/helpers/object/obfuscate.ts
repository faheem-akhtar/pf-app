import { configStatsDataEncryptionKey } from 'config/stats-data-encryption-key';
import { notSecureCipher } from 'helpers/not-secure/cipher';
import { objectDeepMapKeys } from 'helpers/object/deep-map-keys';
import { AnyValueType } from 'types/any/value.type';

import { objectObfuscateKeySeparationSymbol } from './obfuscate-key-separation-symbol';

const KEY_LENGTH = 7;

const encrypt = notSecureCipher(configStatsDataEncryptionKey.get());

const DUMMY_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const objectObfuscate = (rawData: object, randomSeed: number = Math.random()): Record<string, AnyValueType> => {
  let globalCounter = Math.floor(randomSeed * DUMMY_CHARACTERS.length);

  return objectDeepMapKeys(rawData, (key: string): string => {
    let keyWithNoise = '';
    const keyPosition = 1 + Math.floor(randomSeed * 3);

    globalCounter += key.length;
    for (let i = 0; i < KEY_LENGTH; i++) {
      if (i === keyPosition) {
        const keyWithSeparators = `${objectObfuscateKeySeparationSymbol}${key}${objectObfuscateKeySeparationSymbol}`;
        keyWithNoise += keyWithSeparators;
        i += keyWithSeparators.length;
      } else {
        keyWithNoise += DUMMY_CHARACTERS[(i + globalCounter) % DUMMY_CHARACTERS.length];
      }
    }

    return encrypt(keyWithNoise);
  });
};
