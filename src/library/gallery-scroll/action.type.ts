export type GalleryScrollActionType =
  | {
      type: 'move';
      /**
       * The horizontal position where user has touched the gallery
       */
      positionX: number;
    }
  | {
      type: 'start';
      /**
       * The horizontal position of where user has touched the gallery
       */
      positionX: number;
      /**
       * The absolute right coordinate of gallery
       */
      galleryRight: number;
      /**
       * The absolute left coordinate of gallery
       */
      galleryLeft: number;
    }
  | { type: 'end' };
