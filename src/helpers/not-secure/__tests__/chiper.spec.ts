import { notSecureCipher } from '../cipher';
import { notSecureDecipher } from '../decipher';

describe('notSecureCipher', () => {
  it('decipher should decrypt what cipher encrypted', () => {
    const key = '29e48fu29eu8e9';
    const chipher = notSecureCipher(key);
    const decipher = notSecureDecipher(key);
    const stringToEncrypt = 'Hello w0rld!';

    expect(decipher(chipher(stringToEncrypt))).toEqual(stringToEncrypt);
  });
});
