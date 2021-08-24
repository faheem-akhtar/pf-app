import { domToChildArray } from '../to-child-array';

describe('domToChildArray', () => {
  it('should convert children to array', () => {
    expect(domToChildArray(<p>this is a para</p>)).toEqual([
      expect.objectContaining({
        type: 'p',
        props: { children: 'this is a para' },
      }),
    ]);
    expect(
      domToChildArray(
        <>
          <h1>The heading</h1>
          <p>this is a para</p>
        </>
      )
      // eslint-disable-next-line react/jsx-key
    ).toEqual([<h1>The heading</h1>, <p>this is a para</p>]);
  });

  it('should be filtered', () => {
    expect(
      domToChildArray(
        <>
          <h1>The heading</h1>
          <p>this is a 1st para</p>
          <p>this is a 2nd para</p>
        </>,
        (item) => item.type === 'p'
      )
      // eslint-disable-next-line react/jsx-key
    ).toEqual([<p>this is a 1st para</p>, <p>this is a 2nd para</p>]);
  });
});
