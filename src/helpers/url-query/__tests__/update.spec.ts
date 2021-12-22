import { urlQueryUpdate } from '../update';

describe('urlQueryUpdate()', () => {
  it('should update the query string', () => {
    expect(
      urlQueryUpdate('/my/url?a=5&b=6&p=9', {
        a: '6',
        b: '7',
        x: 'y',
      })
    ).toMatchInlineSnapshot(`"/my/url?a=6&b=7&p=9&x=y"`);

    expect(
      urlQueryUpdate('/my/url', {
        a: '6',
      })
    ).toMatchInlineSnapshot(`"/my/url?a=6"`);
  });
});
