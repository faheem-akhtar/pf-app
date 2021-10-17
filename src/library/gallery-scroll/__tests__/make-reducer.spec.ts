import { GalleryScrollActionType } from '../action.type';
import { GalleryScrollBrowseEnum } from '../browse.enum';
import { GalleryScrollItemInterface } from '../item.interface';
import { galleryScrollMakeInitialState } from '../make-initial-state';
import { galleryScrollMakeReducer } from '../make-reducer';

describe('galleryScrollMakeReducer', () => {
  const image1: GalleryScrollItemInterface = { sourceUrl: '1' };
  const image2: GalleryScrollItemInterface = { sourceUrl: '2' };
  const image3: GalleryScrollItemInterface = { sourceUrl: '3' };
  const initialState3Images = galleryScrollMakeInitialState([image1, image2, image3], false);

  const reducer = galleryScrollMakeReducer(false, 3);

  it('return original state when action not matching any condition', () => {
    const result = reducer(initialState3Images, {} as GalleryScrollActionType);

    expect(result).toBe(initialState3Images);
  });

  describe('on start', () => {
    it('on the left should set browse to prev', () => {
      const result = reducer(initialState3Images, {
        type: 'start',
        positionX: 10,
        positionY: 5,
        galleryLeft: 0,
        galleryRight: 100,
      });

      expect(result.isDragging).toBe(false);
      expect(result.pointerPositionStartX).toBe(10);
      expect(result.pointerPositionCurrentX).toBe(10);
      expect(result.browse).toBe(GalleryScrollBrowseEnum.previous);
      expect(result.isTouched).toBe(true);
    });

    it('on the right should set browse to next', () => {
      const result = reducer(initialState3Images, {
        type: 'start',
        positionX: 50,
        positionY: 5,
        galleryLeft: 0,
        galleryRight: 100,
      });

      expect(result.browse).toBe(GalleryScrollBrowseEnum.next);
    });
  });

  describe('on move', () => {
    it('should ignore action if not dragging', () => {
      const result = reducer(initialState3Images, { type: 'move', positionY: 5, positionX: 50 });

      expect(result).toBe(initialState3Images);
    });

    it('should set pointerPositionCurrentX', () => {
      const result = reducer(
        { ...initialState3Images, pointerPositionStartX: 5, pointerPositionStartY: 5 },
        { type: 'move', positionY: 5, positionX: 50 }
      );

      expect(result.pointerPositionCurrentX).toBe(50);
    });

    it('should set pointerPositionCurrentX but should not start dragging', () => {
      const result = reducer(
        { ...initialState3Images, pointerPositionStartX: 5, pointerPositionStartY: 5 },
        { type: 'move', positionY: 5, positionX: 6 }
      );

      expect(result.isDragging).toBe(false);
      expect(result.pointerPositionCurrentX).toBe(6);
    });

    it('should not set dragging when event is onMouseMove', () => {
      const result = reducer(
        { ...initialState3Images, pointerPositionStartX: 5, pointerPositionStartY: 100 },
        { type: 'move', positionY: 5, positionX: 50 }
      );

      expect(result.isDragging).toBe(false);
      expect(result.pointerPositionCurrentX).toBe(50);
    });

    it('should set dragging and touch direction to horizontal', () => {
      const result = reducer(
        { ...initialState3Images, pointerPositionStartX: 5, pointerPositionStartY: 5 },
        { type: 'move', positionX: 50, positionY: 5 }
      );

      expect(result.isDragging).toBe(true);
    });
  });

  describe('on end', () => {
    it('should ignore action if pointerPositionCurrentX is not set', () => {
      const result = reducer(initialState3Images, { type: 'end' });

      expect(result).toEqual(initialState3Images);
    });

    it('drag to left should move the index to seconds item', () => {
      const result = reducer(
        {
          ...initialState3Images,
          pointerPositionStartX: 50,
          pointerPositionCurrentX: 40,
          isDragging: true,
        },
        { type: 'end' }
      );

      expect(result.activeIndex).toBe(1);
      expect(result.browse).toBe(GalleryScrollBrowseEnum.next);
    });

    it('drag to right should move the index to prev item', () => {
      const result = reducer(
        {
          ...initialState3Images,
          pointerPositionStartX: 40,
          pointerPositionCurrentX: 50,
          isDragging: true,
        },
        { type: 'end' }
      );

      expect(result.activeIndex).toBe(2);
      expect(result.browse).toBe(GalleryScrollBrowseEnum.previous);
    });
  });
});
