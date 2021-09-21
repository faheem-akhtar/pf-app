import { stringCharToNumber } from 'helpers/string/char-to-number';

/**
 * Creates a function that let you decrypt the encrypted string
 * @param salt
 * @returns decrypted string
 */
export const notSecureDecipher = (secret: string): ((encodedString: string) => string) => {
  const secretArr = secret.split('').map(stringCharToNumber);

  return (encoded: string): string =>
    (encoded.match(/.{1,2}/g) as string[])
      .map((hex, index) => String.fromCharCode(parseInt(hex, 16) ^ secretArr[index % secretArr.length]))
      .join('');
};
