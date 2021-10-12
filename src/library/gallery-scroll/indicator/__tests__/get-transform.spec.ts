import { galleryScrollIndicatorGetTransform } from '../get-transform';

describe('galleryScrollIndicatorGetTransform', () => {
  it('should return 0 when there is not items', () => {
    const result = galleryScrollIndicatorGetTransform({
      items: [],
      itemWidth: 10,
      isRtl: false,
    });

    expect(result).toBe(0);
  });

  it('should return -10 when first item is hidden', () => {
    const result = galleryScrollIndicatorGetTransform({
      items: [{ isHidden: true }, { isHidden: false }, { isHidden: false }, { isHidden: false }],
      itemWidth: 10,
      isRtl: false,
    });

    expect(result).toBe(-10);
  });

  it('should return -20 when second item is hidden', () => {
    const result = galleryScrollIndicatorGetTransform({
      items: [{ isHidden: true }, { isHidden: true }, { isHidden: false }, { isHidden: false }],
      itemWidth: 10,
      isRtl: false,
    });

    expect(result).toBe(-20);
  });

  it("should return 40 when first 4 items are hidden and it's rtl", () => {
    const result = galleryScrollIndicatorGetTransform({
      items: [{ isHidden: true }, { isHidden: true }, { isHidden: true }, { isHidden: true }, { isHidden: false }],
      itemWidth: 10,
      isRtl: true,
    });

    expect(result).toBe(40);
  });
});
