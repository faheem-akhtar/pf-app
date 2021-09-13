import { highlightString } from 'helpers/highlight/string';

describe('highlightString', () => {
  let originalString: string;

  beforeEach(() => {
    originalString = 'Original string';
  });

  it('should return original(empty) string', () => {
    const stringToHighlight = '';
    expect(highlightString(stringToHighlight, originalString)).toBe(originalString);
  });

  it('should return highlighted string', () => {
    const stringToHighlight = 'string';
    const resultString = 'Original&nbsp;<strong>string</strong>';
    expect(highlightString(stringToHighlight, originalString)).toBe(resultString);
  });

  it('should return highlighted with case sensitive string and another wrapper', () => {
    const stringToHighlight = 'string';
    const resultString = 'Original&nbsp;<p>string</p>';
    const params = {
      caseSensitive: true,
      wrapper: '<p>$1</p>',
    };
    expect(highlightString(stringToHighlight, originalString, params)).toBe(resultString);
  });
});
