import { GalleryScrollBrowseEnum } from '../browse.enum';
import { galleryScrollGetBrowseOnUserTouchDown } from '../get-browse-on-user-touch-down';

describe('galleryScrollGetBrowseOnUserTouchDown', () => {
  it('should return GalleryScrollBrowseEnum.next when clicking on right side of gallery', () => {
    const result = galleryScrollGetBrowseOnUserTouchDown(false, 100, 50);

    expect(result).toBe(GalleryScrollBrowseEnum.next);
  });

  it('should return GalleryScrollBrowseEnum.prev when clicking on left side of gallery', () => {
    const result = galleryScrollGetBrowseOnUserTouchDown(false, 0, 50);

    expect(result).toBe(GalleryScrollBrowseEnum.previous);
  });

  describe('rtl', () => {
    it('should return GalleryScrollBrowseEnum.prev when clicking on right side of gallery', () => {
      const result = galleryScrollGetBrowseOnUserTouchDown(true, 100, 50);

      expect(result).toBe(GalleryScrollBrowseEnum.previous);
    });

    it('should return GalleryScrollBrowseEnum.next when clicking on left side of gallery', () => {
      const result = galleryScrollGetBrowseOnUserTouchDown(true, 0, 50);

      expect(result).toBe(GalleryScrollBrowseEnum.next);
    });
  });
});
