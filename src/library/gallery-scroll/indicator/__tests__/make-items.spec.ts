import { galleryScrollIndicatorMakeItems } from '../make-items';

describe('galleryScrollIndicatorMakeItems', () => {
  it('3 items, last is active', () => {
    const result = galleryScrollIndicatorMakeItems(3, 2);

    expect(result).toMatchSnapshot();
  });

  it('3 items, first is active', () => {
    const result = galleryScrollIndicatorMakeItems(3, 0);

    expect(result).toMatchSnapshot();
  });

  it('3 items, second is active', () => {
    const result = galleryScrollIndicatorMakeItems(3, 1);

    expect(result).toMatchSnapshot();
  });

  it('5 items, second is active', () => {
    const result = galleryScrollIndicatorMakeItems(5, 1);

    expect(result).toMatchSnapshot();
  });

  it('7 items, third is active', () => {
    const result = galleryScrollIndicatorMakeItems(7, 3);

    expect(result).toMatchSnapshot();
  });

  it('12 items, seventh is active', () => {
    const result = galleryScrollIndicatorMakeItems(12, 7);

    expect(result).toMatchSnapshot();
  });
});
