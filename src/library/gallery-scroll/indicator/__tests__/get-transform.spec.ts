import { galleryScrollIndicatorGetTransform } from '../get-transform';

describe('galleryScrollIndicatorGetTransform', () => {
  it('should return 0 when there is not items', () => {
    const result = galleryScrollIndicatorGetTransform({
      items: [],
      itemWidth: 10,
    });

    expect(result).toBe(0);
  });

  it('should return -10 when first item is hidden', () => {
    const result = galleryScrollIndicatorGetTransform({
      items: [{ isHidden: true }, { isHidden: false }, { isHidden: false }, { isHidden: false }],
      itemWidth: 10,
    });

    expect(result).toBe(-10);
  });

  it('should return -20 when last item is hidden', () => {
    const result = galleryScrollIndicatorGetTransform({
      items: [{ isHidden: false }, { isHidden: false }, { isHidden: false }, { isHidden: true }],
      itemWidth: 10,
    });

    expect(result).toBe(0);
  });
});
