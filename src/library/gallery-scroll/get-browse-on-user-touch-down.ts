import { GalleryScrollBrowseEnum } from './browse.enum';

export const galleryScrollGetBrowseOnUserTouchDown = (
  isRtl: boolean,
  touchPositionX: number,
  galleryMiddleX: number
): GalleryScrollBrowseEnum => {
  if (galleryMiddleX > touchPositionX) {
    return isRtl ? GalleryScrollBrowseEnum.next : GalleryScrollBrowseEnum.previous;
  }
  return isRtl ? GalleryScrollBrowseEnum.previous : GalleryScrollBrowseEnum.next;
};
