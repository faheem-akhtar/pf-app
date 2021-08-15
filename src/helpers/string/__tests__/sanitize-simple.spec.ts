import { stringSanitizeSimple } from '../sanitize-simple';

describe('stringSanitizeSimple()', () => {
  it('should prevent javascript', () => {
    expect(stringSanitizeSimple(`<a href="javascript:alert('Hell0')"><a`)).toMatchInlineSnapshot(
      `"%3Ca href%3D%22javascript%3Aalert('Hell0')%22%3E%3Ca"`
    );
  });

  it('should keep space characters', () => {
    expect(stringSanitizeSimple('Dubai Marina')).toEqual('Dubai Marina');
  });
});
