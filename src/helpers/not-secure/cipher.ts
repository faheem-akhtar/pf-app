import { stringCharToNumber } from 'helpers/string/char-to-number';

const byteHex = (n: number): string => ('0' + Number(n).toString(16)).substr(-2);

/**
 * Creates a function that will let you encrypt the string with salt
 * @param secret
 * @returns encrypted string
 */
export const notSecureCipher = (secret: string): ((strToEncrypt: string) => string) => {
  const secretArr = secret.split('').map(stringCharToNumber);

  return (strToEncrypt: string): string =>
    strToEncrypt
      .split('')
      .map((char, index) => byteHex(stringCharToNumber(char) ^ secretArr[index % secretArr.length]))
      .join('');
};
